(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sample"] = factory();
	else
		root["sample"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 64:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   instantiateManifest: () => (/* binding */ instantiateManifest)
/* harmony export */ });
const instantiateManifest = (
    packageAddress,
    gumballPrice,
    accountAddress
) => `
CALL_FUNCTION
    Address("${packageAddress}")
    "GumballMachine"
    "instantiate_gumball_machine"
    Decimal("${gumballPrice}")
; 
CALL_METHOD
    Address("${accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP")
;`; 


/***/ }),

/***/ 201:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var radix_dapp_toolkit_1 = __webpack_require__(226);
var babylon_gateway_api_sdk_1 = __webpack_require__(827);
var instantiate_gumball_machine_1 = __webpack_require__(64);
//import { buyGumballManifest } from './manifests/buy_gumball'
// Connect to the Radix Network 
var dAppDefinitionAddress = "account_tdx_2_129yh5v76a2vp8dnqyc45gxlc280cv3dcw2y9glmhk7jsx5vzm8ndws";
// Instantiate RDT
var dappConfig = {
    networkId: radix_dapp_toolkit_1.RadixNetwork.Stokenet,
    applicationVersion: "1.0.0",
    applicationName: "Test Material Tracking dApp",
    dAppDefinitionAddress: dAppDefinitionAddress,
    //useCache: false,
};
var rdt = (0, radix_dapp_toolkit_1.RadixDappToolkit)(dappConfig);
//const rdt = RadixDappToolkit({
//    networkId: RadixNetwork.Stokenet,
//    applicationVersion: "1.0.0",
//    applicationName: "Test Material Tracking dApp",
//    dAppDefinitionAddress: dAppDefinitionAddress,
//    //useCache: false,
//})
var gatewayApi = babylon_gateway_api_sdk_1.GatewayApiClient.initialize(dappConfig);
// ********** Global states **********
var account; // Users connected wallet account
var pacAddress = "package_tdx_2_1p5462ypk8k6fujww0fl50fzdwg6j06e08dqu32eh97lfdj7c0yrtj6";
var componentAddress; // GumballMachine component address on Stokenet
var ownerBadgeAddress; // Gumball Machine Owner Badge resource address
var gumballResourceAddress; // GUM token resource address
var xrdAddress = "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc";
rdt.walletApi.setRequestData(radix_dapp_toolkit_1.DataRequestBuilder.accounts().exactly(1));
rdt.walletApi.walletData$.subscribe(function (walletData) {
    var _a, _b;
    var txtPackageAddress = document.getElementById("packageAddress");
    txtPackageAddress.value = pacAddress;
    console.log("connected wallet data: ", walletData);
    account = walletData.accounts[0];
    // Display the account name and address on the page
    document.getElementById("accountName").innerText =
        (_a = account === null || account === void 0 ? void 0 : account.label) !== null && _a !== void 0 ? _a : "None connected";
    document.getElementById("accountAddress").innerText =
        (_b = account === null || account === void 0 ? void 0 : account.address) !== null && _b !== void 0 ? _b : "None connected";
});
document.getElementById("instantiateComponent").onclick = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tPackageAddress, packageAddress, tGumballPrice, gumballPrice, manifest, result, transactionStatus, committedDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Instantiate Component >>>>>>> ");
                    tPackageAddress = document.getElementById("packageAddress");
                    packageAddress = tPackageAddress.value;
                    tGumballPrice = document.getElementById("gumballPrice");
                    gumballPrice = tGumballPrice.value;
                    manifest = (0, instantiate_gumball_machine_1.instantiateManifest)(packageAddress, gumballPrice, account.address);
                    console.log("Instantiate Manifest: ", manifest);
                    return [4 /*yield*/, rdt.walletApi.sendTransaction({
                            transactionManifest: manifest,
                            version: 1,
                        })];
                case 1:
                    result = _a.sent();
                    if (result.isErr())
                        throw result.error;
                    console.log("Instantiate Result: ", result.value);
                    return [4 /*yield*/, gatewayApi.transaction.getStatus(result.value.transactionIntentHash)];
                case 2:
                    transactionStatus = _a.sent();
                    console.log("Instantiate transaction status:", transactionStatus);
                    return [4 /*yield*/, gatewayApi.transaction.getCommittedDetails(result.value.transactionIntentHash)];
                case 3:
                    committedDetails = _a.sent();
                    console.log("Instantiate committed details: ", committedDetails);
                    // set addresses from details committed to the ledger in the transaction
                    componentAddress = committedDetails.transaction.affected_global_entities[2];
                    ownerBadgeAddress = committedDetails.transaction.affected_global_entities[3];
                    gumballResourceAddress =
                        committedDetails.transaction.affected_global_entities[4];
                    // show the addresses on the page 
                    showAddresses();
                    return [2 /*return*/];
            }
        });
    });
};
function showAddresses() {
    document.getElementById("componentAddress").innerText =
        componentAddress !== null && componentAddress !== void 0 ? componentAddress : "None";
    document.getElementById("ownerBadgeAddress").innerText =
        ownerBadgeAddress !== null && ownerBadgeAddress !== void 0 ? ownerBadgeAddress : "None";
    document.getElementById("gumballResourceAddress").innerText =
        gumballResourceAddress !== null && gumballResourceAddress !== void 0 ? gumballResourceAddress : "None";
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			143: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksample"] = self["webpackChunksample"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [712], () => (__webpack_require__(201)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});