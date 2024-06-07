import {
    RadixDappToolkit, 
    DataRequestBuilder, 
    RadixNetwork, 
} from '@radixdlt/radix-dapp-toolkit'

import { GatewayApiClient, StateEntityDetailsResponse, StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import { instantiateManifest } from './manifests/instantiate_gumball_machine'
import { buyGumballManifest } from './manifests/buy_gumball'
import { setPriceManifest } from './manifests/set_price'
import { withdrawManifest } from './manifests/withdraw_earning'
import { refillManifest } from './manifests/refill_gumball_machine'

// Connect to the Radix Network 
const dAppDefinitionAddress =
    "account_tdx_2_129yh5v76a2vp8dnqyc45gxlc280cv3dcw2y9glmhk7jsx5vzm8ndws"

// Instantiate RDT
const dappConfig = {
    networkId: RadixNetwork.Stokenet,
    applicationVersion: "1.0.0",
    applicationName: "Test Material Tracking dApp",
    dAppDefinitionAddress: dAppDefinitionAddress,
    //useCache: false,
}; 
const rdt = RadixDappToolkit(dappConfig); 
//const rdt = RadixDappToolkit({
//    networkId: RadixNetwork.Stokenet,
//    applicationVersion: "1.0.0",
//    applicationName: "Test Material Tracking dApp",
//    dAppDefinitionAddress: dAppDefinitionAddress,
//    //useCache: false,
//})

const gatewayApi = GatewayApiClient.initialize(dappConfig); 



// ********** Global states **********
let account; // Users connected wallet account
let pacAddress = "package_tdx_2_1p5462ypk8k6fujww0fl50fzdwg6j06e08dqu32eh97lfdj7c0yrtj6"; 
let componentAddress; // GumballMachine component address on Stokenet
let ownerBadgeAddress; // Gumball Machine Owner Badge resource address
let gumballResourceAddress; // GUM token resource address

let xrdAddress = "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc"; 

rdt.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1))

rdt.walletApi.walletData$.subscribe((walletData) => {
    let txtPackageAddress = document.getElementById("packageAddress") as HTMLInputElement;
    txtPackageAddress.value = pacAddress;

    console.log("connected wallet data: ", walletData)
    account = walletData.accounts[0]
    // Display the account name and address on the page
    document.getElementById("accountName").innerText =
        account?.label ?? "None connected";
    document.getElementById("accountAddress").innerText =
        account?.address ?? "None connected";
})

document.getElementById("instantiateComponent").onclick = async function () { 

    console.log("Instantiate Component >>>>>>> "); 

    let tPackageAddress = document.getElementById("packageAddress") as HTMLInputElement;
    const packageAddress = tPackageAddress.value;
    let tGumballPrice = document.getElementById("gumballPrice") as HTMLInputElement;
    const gumballPrice = tGumballPrice.value;

    const manifest = instantiateManifest(
        packageAddress,
        gumballPrice,
        account.address
    ); 

    console.log("Instantiate Manifest: ", manifest); 

    // Send manifest to wallet for signing 
    const result = await rdt.walletApi.sendTransaction({
        transactionManifest: manifest,
        version: 1,
    }); 
    if (result.isErr()) throw result.error; 
    console.log("Instantiate Result: ", result.value); 

    // fetch the transaction status from the gateway api 
    const transactionStatus = await gatewayApi.transaction.getStatus(
        result.value.transactionIntentHash
    ); 
    console.log("Instantiate transaction status:", transactionStatus); 

    // fetch the details of changes committed to ledger from gateway api 
    const committedDetails = await gatewayApi.transaction.getCommittedDetails(
        result.value.transactionIntentHash
    ); 
    console.log("Instantiate committed details: ", committedDetails); 

    // set addresses from details committed to the ledger in the transaction
    componentAddress = committedDetails.transaction.affected_global_entities[2]; 
    ownerBadgeAddress = committedDetails.transaction.affected_global_entities[3];
    gumballResourceAddress =
        committedDetails.transaction.affected_global_entities[4]; 

    // show the addresses on the page 
    showAddresses(); 
    // update the gumball amount and earnigns displayed on the page 
    fetchAndShowGumballMachineState(); 
}

function showAddresses() { 
    document.getElementById("componentAddress").innerText =
        componentAddress ?? "None"; 
    document.getElementById("ownerBadgeAddress").innerText =
        ownerBadgeAddress ?? "None"; 
    document.getElementById("gumballResourceAddress").innerText =
        gumballResourceAddress ?? "None"; 
}

// fetch and update displayed component state 
async function fetchAndShowGumballMachineState() { 
    // use gateway api to fetch component details 
    if (componentAddress) {
        const componentDetails =
            await gatewayApi.state.getEntityDetailsVaultAggregated(componentAddress); 
        console.log("Component Details: ", componentDetails); 

        // get the price, number of gumballs, and earnings from the component state
        //let entity: StateEntityDetailsResponseFungibleResourceDetails; 
        let price: any; 
        
        if (componentDetails.details.type === 'FungibleResource') {
            const fungibleDetails = componentDetails.details as StateEntityDetailsResponseFungibleResourceDetails; 
            price = componentDetails.details.state.fields.find(
                    (f) => f.field_name === "price"
                )?.value;
        }


        const numOfGumballs = componentDetails.fungible_resources.items.find(
            (item) => item.resource_address === gumballResourceAddress
        )?.vaults.items[0].amount; 
        const earnings = componentDetails.fungible_resources.items.find(
            (item) => item.resource_address === xrdAddress
        )?.vaults.items[0].amount; 

        //show the values
        document.getElementById("numOfGumballs").innerText = numOfGumballs; 
        document.getElementById("price").innerText = price; 
        document.getElementById("earnings").innerText = earnings + " XRD"; 
    }
}

// *************** Buy Gumball ****************
document.getElementById("buyGumball").onclick = async function () {
    const xrdAmount = document.getElementById("price").innerText;
    const manifest = buyGumballManifest(
        xrdAmount,
        xrdAddress,
        account.address,
        componentAddress,
    );
    console.log("buy_gumball manifest:", manifest);

    // send manifest to wallet for signing 
    const result = await rdt.walletApi.sendTransaction({
        transactionManifest: manifest,
        version: 1,
    });
    if (result.isErr()) throw result.error;
    console.log("Buy Gumball result:", result.value);

    // fetch the transaction status from the gateway api 
    const transactionStatus = await gatewayApi.transaction.getStatus(
        result.value.transactionIntentHash
    );
    console.log("Buy Gumball transaction status:", transactionStatus);

    fetchAndShowGumballMachineState();
}; 

// *************** Set Price ****************
document.getElementById("setPrice").onclick = async function () {
    const newPrice = (document.getElementById("newPrice") as HTMLInputElement).value;
    const manifest = setPriceManifest(
        newPrice,
        account.address,
        componentAddress,
        ownerBadgeAddress
    );
    console.log("Set Price manifest:", manifest);

    // send manifest to wallet for signing
    const result = await rdt.walletApi.sendTransaction({
        transactionManifest: manifest,
        version: 1,
    });
    if (result.isErr()) throw result.error;
    console.log("Set Price result:", result.value);

    // fetch the transaction status from the gateway api 
    const transactionStatus = await gatewayApi.transaction.getStatus(
        result.value.transactionIntentHash
    );
    console.log("Set Price transaction status:", transactionStatus);

    // fetch and update the price 
    fetchAndShowGumballMachineState();
}; 

// ************ Refill Gumball *****************
document.getElementById("refill").onclick = async function () {
    const manifest = refillManifest(
        account.address,
        componentAddress,
        ownerBadgeAddress
    ); 
    console.log("Refill manifest:", manifest); 


}
