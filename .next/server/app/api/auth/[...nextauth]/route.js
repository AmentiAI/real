"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist\\client\\components\\action-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!*********************************************************************************************!*\
  !*** external "next/dist\\client\\components\\static-generation-async-storage.external.js" ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CWilso%5Creal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CWilso%5Creal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CWilso%5Creal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CWilso%5Creal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var C_Users_Wilso_real_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([C_Users_Wilso_real_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_2__]);\nC_Users_Wilso_real_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Wilso\\\\real\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Wilso_real_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_2__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\n\n\n//# sourceMappingURL=app-route.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNXaWxzbyU1Q3JlYWwlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1dpbHNvJTVDcmVhbCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDNkI7QUFDNUY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDaUo7O0FBRWpKLHFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYW1lbnRpLWFpLXdlYnNpdGUvPzY2NWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcV2lsc29cXFxccmVhbFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxXaWxzb1xcXFxyZWFsXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CWilso%5Creal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CWilso%5Creal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_auth__WEBPACK_IMPORTED_MODULE_1__]);\n_lib_auth__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFnQztBQUNRO0FBRXhDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTSIsInNvdXJjZXMiOlsid2VicGFjazovL2FtZW50aS1haS13ZWJzaXRlLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/YzhhNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJ1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnXHJcblxyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiYXV0aE9wdGlvbnMiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"(rsc)/./lib/db.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_2__]);\n_db__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                try {\n                    const client = await _db__WEBPACK_IMPORTED_MODULE_2__[\"default\"].connect();\n                    try {\n                        const result = await client.query(\"SELECT * FROM users WHERE email = $1\", [\n                            credentials.email\n                        ]);\n                        if (result.rows.length === 0) {\n                            return null;\n                        }\n                        const user = result.rows[0];\n                        const isValidPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.password);\n                        if (!isValidPassword) {\n                            return null;\n                        }\n                        return {\n                            id: user.id.toString(),\n                            email: user.email,\n                            name: user.name,\n                            role: user.role\n                        };\n                    } finally{\n                        client.release();\n                    }\n                } catch (error) {\n                    console.error(\"Auth error:\", error);\n                    return null;\n                }\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/admin/login\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.sub;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    debug: \"development\" === \"development\"\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNpRTtBQUNwQztBQUNOO0FBRWhCLE1BQU1HLGNBQStCO0lBQzFDQyxXQUFXO1FBQ1RKLDJFQUFtQkEsQ0FBQztZQUNsQkssTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxPQUFPO2dCQUNUO2dCQUVBLElBQUk7b0JBQ0YsTUFBTUUsU0FBUyxNQUFNViwyQ0FBSUEsQ0FBQ1csT0FBTztvQkFFakMsSUFBSTt3QkFDRixNQUFNQyxTQUFTLE1BQU1GLE9BQU9HLEtBQUssQ0FDL0Isd0NBQ0E7NEJBQUNULFlBQVlDLEtBQUs7eUJBQUM7d0JBR3JCLElBQUlPLE9BQU9FLElBQUksQ0FBQ0MsTUFBTSxLQUFLLEdBQUc7NEJBQzVCLE9BQU87d0JBQ1Q7d0JBRUEsTUFBTUMsT0FBT0osT0FBT0UsSUFBSSxDQUFDLEVBQUU7d0JBQzNCLE1BQU1HLGtCQUFrQixNQUFNbEIsdURBQWMsQ0FBQ0ssWUFBWUksUUFBUSxFQUFFUSxLQUFLUixRQUFRO3dCQUVoRixJQUFJLENBQUNTLGlCQUFpQjs0QkFDcEIsT0FBTzt3QkFDVDt3QkFFQSxPQUFPOzRCQUNMRSxJQUFJSCxLQUFLRyxFQUFFLENBQUNDLFFBQVE7NEJBQ3BCZixPQUFPVyxLQUFLWCxLQUFLOzRCQUNqQkYsTUFBTWEsS0FBS2IsSUFBSTs0QkFDZmtCLE1BQU1MLEtBQUtLLElBQUk7d0JBQ2pCO29CQUNGLFNBQVU7d0JBQ1JYLE9BQU9ZLE9BQU87b0JBQ2hCO2dCQUNGLEVBQUUsT0FBT0MsT0FBTztvQkFDZEMsUUFBUUQsS0FBSyxDQUFDLGVBQWVBO29CQUM3QixPQUFPO2dCQUNUO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RFLFNBQVM7UUFDUEMsVUFBVTtJQUNaO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRWYsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JlLE1BQU1WLElBQUksR0FBR0wsS0FBS0ssSUFBSTtZQUN4QjtZQUNBLE9BQU9VO1FBQ1Q7UUFDQSxNQUFNTixTQUFRLEVBQUVBLE9BQU8sRUFBRU0sS0FBSyxFQUFFO1lBQzlCLElBQUlBLE9BQU87Z0JBQ1ROLFFBQVFULElBQUksQ0FBQ0csRUFBRSxHQUFHWSxNQUFNQyxHQUFHO2dCQUMzQlAsUUFBUVQsSUFBSSxDQUFDSyxJQUFJLEdBQUdVLE1BQU1WLElBQUk7WUFDaEM7WUFDQSxPQUFPSTtRQUNUO0lBQ0Y7SUFDQVEsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlO0lBQ25DQyxPQUFPSCxrQkFBeUI7QUFDbEMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FtZW50aS1haS13ZWJzaXRlLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJ1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcydcbmltcG9ydCBwb29sIGZyb20gJy4vZGInXG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6ICdjcmVkZW50aWFscycsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogJ1Bhc3N3b3JkJywgdHlwZTogJ3Bhc3N3b3JkJyB9XG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKVxuICAgICAgICAgIFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkoXG4gICAgICAgICAgICAgICdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGVtYWlsID0gJDEnLFxuICAgICAgICAgICAgICBbY3JlZGVudGlhbHMuZW1haWxdXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQucm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdXNlciA9IHJlc3VsdC5yb3dzWzBdXG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZClcblxuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkUGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaWQ6IHVzZXIuaWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGNsaWVudC5yZWxlYXNlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignQXV0aCBlcnJvcjonLCBlcnJvcilcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgXSxcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiAnand0J1xuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9hZG1pbi9sb2dpbidcbiAgfSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuXG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLnN1YlxuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGVcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uXG4gICAgfVxuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbiAgZGVidWc6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnXG59XG4iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsInBvb2wiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJjbGllbnQiLCJjb25uZWN0IiwicmVzdWx0IiwicXVlcnkiLCJyb3dzIiwibGVuZ3RoIiwidXNlciIsImlzVmFsaWRQYXNzd29yZCIsImNvbXBhcmUiLCJpZCIsInRvU3RyaW5nIiwicm9sZSIsInJlbGVhc2UiLCJlcnJvciIsImNvbnNvbGUiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJwYWdlcyIsInNpZ25JbiIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic3ViIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCIsImRlYnVnIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   initDatabase: () => (/* binding */ initDatabase)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([pg__WEBPACK_IMPORTED_MODULE_0__]);\npg__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst pool = new pg__WEBPACK_IMPORTED_MODULE_0__.Pool({\n    connectionString: process.env.DATABASE_URL || \"postgresql://neondb_owner:npg_jzymWCDE7IF4@ep-calm-field-adqp91o1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require\",\n    ssl: {\n        rejectUnauthorized: false\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pool);\n// Database schema initialization\nasync function initDatabase() {\n    const client = await pool.connect();\n    try {\n        // Users table (admin users)\n        await client.query(`\r\n      CREATE TABLE IF NOT EXISTS users (\r\n        id SERIAL PRIMARY KEY,\r\n        email VARCHAR(255) UNIQUE NOT NULL,\r\n        password VARCHAR(255) NOT NULL,\r\n        role VARCHAR(50) DEFAULT 'admin',\r\n        name VARCHAR(255) NOT NULL,\r\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\r\n      )\r\n    `);\n        // Clients table (business clients)\n        await client.query(`\r\n      CREATE TABLE IF NOT EXISTS clients (\r\n        id SERIAL PRIMARY KEY,\r\n        name VARCHAR(255) NOT NULL,\r\n        email VARCHAR(255) NOT NULL,\r\n        phone VARCHAR(50),\r\n        company VARCHAR(255),\r\n        website VARCHAR(255),\r\n        industry VARCHAR(100),\r\n        location VARCHAR(255),\r\n        status VARCHAR(50) DEFAULT 'active',\r\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\r\n      )\r\n    `);\n        // Services table\n        await client.query(`\r\n      CREATE TABLE IF NOT EXISTS services (\r\n        id SERIAL PRIMARY KEY,\r\n        title VARCHAR(255) NOT NULL,\r\n        description TEXT,\r\n        price DECIMAL(10,2),\r\n        category VARCHAR(100),\r\n        features JSONB,\r\n        is_active BOOLEAN DEFAULT true,\r\n        order_index INTEGER DEFAULT 0,\r\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\r\n      )\r\n    `);\n        // Portfolio/Projects table\n        await client.query(`\r\n      CREATE TABLE IF NOT EXISTS projects (\r\n        id SERIAL PRIMARY KEY,\r\n        title VARCHAR(255) NOT NULL,\r\n        description TEXT,\r\n        image_url VARCHAR(500),\r\n        client_id INTEGER REFERENCES clients(id),\r\n        services_used JSONB,\r\n        results JSONB,\r\n        is_featured BOOLEAN DEFAULT false,\r\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\r\n      )\r\n    `);\n        // Content table for dynamic content\n        await client.query(`\r\n      CREATE TABLE IF NOT EXISTS content (\r\n        id SERIAL PRIMARY KEY,\r\n        page VARCHAR(100) NOT NULL,\r\n        section VARCHAR(100) NOT NULL,\r\n        title VARCHAR(255),\r\n        content TEXT,\r\n        content_type VARCHAR(50) DEFAULT 'text',\r\n        order_index INTEGER DEFAULT 0,\r\n        is_active BOOLEAN DEFAULT true,\r\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\r\n      )\r\n    `);\n        // Contact inquiries table\n        await client.query(`\r\n      CREATE TABLE IF NOT EXISTS inquiries (\r\n        id SERIAL PRIMARY KEY,\r\n        name VARCHAR(255) NOT NULL,\r\n        email VARCHAR(255) NOT NULL,\r\n        phone VARCHAR(50),\r\n        company VARCHAR(255),\r\n        message TEXT,\r\n        service_interest VARCHAR(255),\r\n        status VARCHAR(50) DEFAULT 'new',\r\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\r\n      )\r\n    `);\n        // Blog posts table\n        await client.query(`\r\n      CREATE TABLE IF NOT EXISTS blog_posts (\r\n        id SERIAL PRIMARY KEY,\r\n        title VARCHAR(255) NOT NULL,\r\n        slug VARCHAR(255) UNIQUE NOT NULL,\r\n        excerpt TEXT,\r\n        content TEXT,\r\n        featured_image VARCHAR(500),\r\n        author_id INTEGER REFERENCES users(id),\r\n        is_published BOOLEAN DEFAULT false,\r\n        published_at TIMESTAMP,\r\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\r\n      )\r\n    `);\n        // SEO data table\n        await client.query(`\r\n      CREATE TABLE IF NOT EXISTS seo_data (\r\n        id SERIAL PRIMARY KEY,\r\n        page VARCHAR(100) NOT NULL,\r\n        title VARCHAR(255),\r\n        description TEXT,\r\n        keywords TEXT,\r\n        og_title VARCHAR(255),\r\n        og_description TEXT,\r\n        og_image VARCHAR(500),\r\n        canonical_url VARCHAR(500),\r\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\r\n      )\r\n    `);\n        console.log(\"Database schema initialized successfully\");\n    } catch (error) {\n        console.error(\"Error initializing database:\", error);\n        throw error;\n    } finally{\n        client.release();\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTBCO0FBRTFCLE1BQU1DLE9BQU8sSUFBSUQsb0NBQUlBLENBQUM7SUFDcEJFLGtCQUFrQkMsUUFBUUMsR0FBRyxDQUFDQyxZQUFZLElBQUk7SUFDOUNDLEtBQUs7UUFDSEMsb0JBQW9CO0lBQ3RCO0FBQ0Y7QUFFQSxpRUFBZU4sSUFBSUEsRUFBQztBQUVwQixpQ0FBaUM7QUFDMUIsZUFBZU87SUFDcEIsTUFBTUMsU0FBUyxNQUFNUixLQUFLUyxPQUFPO0lBRWpDLElBQUk7UUFDRiw0QkFBNEI7UUFDNUIsTUFBTUQsT0FBT0UsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFVcEIsQ0FBQztRQUVELG1DQUFtQztRQUNuQyxNQUFNRixPQUFPRSxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUFjcEIsQ0FBQztRQUVELGlCQUFpQjtRQUNqQixNQUFNRixPQUFPRSxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztJQWFwQixDQUFDO1FBRUQsMkJBQTJCO1FBQzNCLE1BQU1GLE9BQU9FLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0lBYXBCLENBQUM7UUFFRCxvQ0FBb0M7UUFDcEMsTUFBTUYsT0FBT0UsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFhcEIsQ0FBQztRQUVELDBCQUEwQjtRQUMxQixNQUFNRixPQUFPRSxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztJQWFwQixDQUFDO1FBRUQsbUJBQW1CO1FBQ25CLE1BQU1GLE9BQU9FLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7OztJQWNwQixDQUFDO1FBRUQsaUJBQWlCO1FBQ2pCLE1BQU1GLE9BQU9FLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7OztJQWNwQixDQUFDO1FBRURDLFFBQVFDLEdBQUcsQ0FBQztJQUNkLEVBQUUsT0FBT0MsT0FBTztRQUNkRixRQUFRRSxLQUFLLENBQUMsZ0NBQWdDQTtRQUM5QyxNQUFNQTtJQUNSLFNBQVU7UUFDUkwsT0FBT00sT0FBTztJQUNoQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYW1lbnRpLWFpLXdlYnNpdGUvLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb29sIH0gZnJvbSAncGcnO1xyXG5cclxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHtcclxuICBjb25uZWN0aW9uU3RyaW5nOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgfHwgJ3Bvc3RncmVzcWw6Ly9uZW9uZGJfb3duZXI6bnBnX2p6eW1XQ0RFN0lGNEBlcC1jYWxtLWZpZWxkLWFkcXA5MW8xLXBvb2xlci5jLTIudXMtZWFzdC0xLmF3cy5uZW9uLnRlY2gvbmVvbmRiP3NzbG1vZGU9cmVxdWlyZSZjaGFubmVsX2JpbmRpbmc9cmVxdWlyZScsXHJcbiAgc3NsOiB7XHJcbiAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlXHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBvb2w7XHJcblxyXG4vLyBEYXRhYmFzZSBzY2hlbWEgaW5pdGlhbGl6YXRpb25cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXREYXRhYmFzZSgpIHtcclxuICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcclxuICBcclxuICB0cnkge1xyXG4gICAgLy8gVXNlcnMgdGFibGUgKGFkbWluIHVzZXJzKVxyXG4gICAgYXdhaXQgY2xpZW50LnF1ZXJ5KGBcclxuICAgICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgdXNlcnMgKFxyXG4gICAgICAgIGlkIFNFUklBTCBQUklNQVJZIEtFWSxcclxuICAgICAgICBlbWFpbCBWQVJDSEFSKDI1NSkgVU5JUVVFIE5PVCBOVUxMLFxyXG4gICAgICAgIHBhc3N3b3JkIFZBUkNIQVIoMjU1KSBOT1QgTlVMTCxcclxuICAgICAgICByb2xlIFZBUkNIQVIoNTApIERFRkFVTFQgJ2FkbWluJyxcclxuICAgICAgICBuYW1lIFZBUkNIQVIoMjU1KSBOT1QgTlVMTCxcclxuICAgICAgICBjcmVhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QLFxyXG4gICAgICAgIHVwZGF0ZWRfYXQgVElNRVNUQU1QIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVBcclxuICAgICAgKVxyXG4gICAgYCk7XHJcblxyXG4gICAgLy8gQ2xpZW50cyB0YWJsZSAoYnVzaW5lc3MgY2xpZW50cylcclxuICAgIGF3YWl0IGNsaWVudC5xdWVyeShgXHJcbiAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIGNsaWVudHMgKFxyXG4gICAgICAgIGlkIFNFUklBTCBQUklNQVJZIEtFWSxcclxuICAgICAgICBuYW1lIFZBUkNIQVIoMjU1KSBOT1QgTlVMTCxcclxuICAgICAgICBlbWFpbCBWQVJDSEFSKDI1NSkgTk9UIE5VTEwsXHJcbiAgICAgICAgcGhvbmUgVkFSQ0hBUig1MCksXHJcbiAgICAgICAgY29tcGFueSBWQVJDSEFSKDI1NSksXHJcbiAgICAgICAgd2Vic2l0ZSBWQVJDSEFSKDI1NSksXHJcbiAgICAgICAgaW5kdXN0cnkgVkFSQ0hBUigxMDApLFxyXG4gICAgICAgIGxvY2F0aW9uIFZBUkNIQVIoMjU1KSxcclxuICAgICAgICBzdGF0dXMgVkFSQ0hBUig1MCkgREVGQVVMVCAnYWN0aXZlJyxcclxuICAgICAgICBjcmVhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QLFxyXG4gICAgICAgIHVwZGF0ZWRfYXQgVElNRVNUQU1QIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVBcclxuICAgICAgKVxyXG4gICAgYCk7XHJcblxyXG4gICAgLy8gU2VydmljZXMgdGFibGVcclxuICAgIGF3YWl0IGNsaWVudC5xdWVyeShgXHJcbiAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHNlcnZpY2VzIChcclxuICAgICAgICBpZCBTRVJJQUwgUFJJTUFSWSBLRVksXHJcbiAgICAgICAgdGl0bGUgVkFSQ0hBUigyNTUpIE5PVCBOVUxMLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uIFRFWFQsXHJcbiAgICAgICAgcHJpY2UgREVDSU1BTCgxMCwyKSxcclxuICAgICAgICBjYXRlZ29yeSBWQVJDSEFSKDEwMCksXHJcbiAgICAgICAgZmVhdHVyZXMgSlNPTkIsXHJcbiAgICAgICAgaXNfYWN0aXZlIEJPT0xFQU4gREVGQVVMVCB0cnVlLFxyXG4gICAgICAgIG9yZGVyX2luZGV4IElOVEVHRVIgREVGQVVMVCAwLFxyXG4gICAgICAgIGNyZWF0ZWRfYXQgVElNRVNUQU1QIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVAsXHJcbiAgICAgICAgdXBkYXRlZF9hdCBUSU1FU1RBTVAgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUFxyXG4gICAgICApXHJcbiAgICBgKTtcclxuXHJcbiAgICAvLyBQb3J0Zm9saW8vUHJvamVjdHMgdGFibGVcclxuICAgIGF3YWl0IGNsaWVudC5xdWVyeShgXHJcbiAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHByb2plY3RzIChcclxuICAgICAgICBpZCBTRVJJQUwgUFJJTUFSWSBLRVksXHJcbiAgICAgICAgdGl0bGUgVkFSQ0hBUigyNTUpIE5PVCBOVUxMLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uIFRFWFQsXHJcbiAgICAgICAgaW1hZ2VfdXJsIFZBUkNIQVIoNTAwKSxcclxuICAgICAgICBjbGllbnRfaWQgSU5URUdFUiBSRUZFUkVOQ0VTIGNsaWVudHMoaWQpLFxyXG4gICAgICAgIHNlcnZpY2VzX3VzZWQgSlNPTkIsXHJcbiAgICAgICAgcmVzdWx0cyBKU09OQixcclxuICAgICAgICBpc19mZWF0dXJlZCBCT09MRUFOIERFRkFVTFQgZmFsc2UsXHJcbiAgICAgICAgY3JlYXRlZF9hdCBUSU1FU1RBTVAgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUCxcclxuICAgICAgICB1cGRhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QXHJcbiAgICAgIClcclxuICAgIGApO1xyXG5cclxuICAgIC8vIENvbnRlbnQgdGFibGUgZm9yIGR5bmFtaWMgY29udGVudFxyXG4gICAgYXdhaXQgY2xpZW50LnF1ZXJ5KGBcclxuICAgICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgY29udGVudCAoXHJcbiAgICAgICAgaWQgU0VSSUFMIFBSSU1BUlkgS0VZLFxyXG4gICAgICAgIHBhZ2UgVkFSQ0hBUigxMDApIE5PVCBOVUxMLFxyXG4gICAgICAgIHNlY3Rpb24gVkFSQ0hBUigxMDApIE5PVCBOVUxMLFxyXG4gICAgICAgIHRpdGxlIFZBUkNIQVIoMjU1KSxcclxuICAgICAgICBjb250ZW50IFRFWFQsXHJcbiAgICAgICAgY29udGVudF90eXBlIFZBUkNIQVIoNTApIERFRkFVTFQgJ3RleHQnLFxyXG4gICAgICAgIG9yZGVyX2luZGV4IElOVEVHRVIgREVGQVVMVCAwLFxyXG4gICAgICAgIGlzX2FjdGl2ZSBCT09MRUFOIERFRkFVTFQgdHJ1ZSxcclxuICAgICAgICBjcmVhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QLFxyXG4gICAgICAgIHVwZGF0ZWRfYXQgVElNRVNUQU1QIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVBcclxuICAgICAgKVxyXG4gICAgYCk7XHJcblxyXG4gICAgLy8gQ29udGFjdCBpbnF1aXJpZXMgdGFibGVcclxuICAgIGF3YWl0IGNsaWVudC5xdWVyeShgXHJcbiAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIGlucXVpcmllcyAoXHJcbiAgICAgICAgaWQgU0VSSUFMIFBSSU1BUlkgS0VZLFxyXG4gICAgICAgIG5hbWUgVkFSQ0hBUigyNTUpIE5PVCBOVUxMLFxyXG4gICAgICAgIGVtYWlsIFZBUkNIQVIoMjU1KSBOT1QgTlVMTCxcclxuICAgICAgICBwaG9uZSBWQVJDSEFSKDUwKSxcclxuICAgICAgICBjb21wYW55IFZBUkNIQVIoMjU1KSxcclxuICAgICAgICBtZXNzYWdlIFRFWFQsXHJcbiAgICAgICAgc2VydmljZV9pbnRlcmVzdCBWQVJDSEFSKDI1NSksXHJcbiAgICAgICAgc3RhdHVzIFZBUkNIQVIoNTApIERFRkFVTFQgJ25ldycsXHJcbiAgICAgICAgY3JlYXRlZF9hdCBUSU1FU1RBTVAgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUCxcclxuICAgICAgICB1cGRhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QXHJcbiAgICAgIClcclxuICAgIGApO1xyXG5cclxuICAgIC8vIEJsb2cgcG9zdHMgdGFibGVcclxuICAgIGF3YWl0IGNsaWVudC5xdWVyeShgXHJcbiAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIGJsb2dfcG9zdHMgKFxyXG4gICAgICAgIGlkIFNFUklBTCBQUklNQVJZIEtFWSxcclxuICAgICAgICB0aXRsZSBWQVJDSEFSKDI1NSkgTk9UIE5VTEwsXHJcbiAgICAgICAgc2x1ZyBWQVJDSEFSKDI1NSkgVU5JUVVFIE5PVCBOVUxMLFxyXG4gICAgICAgIGV4Y2VycHQgVEVYVCxcclxuICAgICAgICBjb250ZW50IFRFWFQsXHJcbiAgICAgICAgZmVhdHVyZWRfaW1hZ2UgVkFSQ0hBUig1MDApLFxyXG4gICAgICAgIGF1dGhvcl9pZCBJTlRFR0VSIFJFRkVSRU5DRVMgdXNlcnMoaWQpLFxyXG4gICAgICAgIGlzX3B1Ymxpc2hlZCBCT09MRUFOIERFRkFVTFQgZmFsc2UsXHJcbiAgICAgICAgcHVibGlzaGVkX2F0IFRJTUVTVEFNUCxcclxuICAgICAgICBjcmVhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QLFxyXG4gICAgICAgIHVwZGF0ZWRfYXQgVElNRVNUQU1QIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVBcclxuICAgICAgKVxyXG4gICAgYCk7XHJcblxyXG4gICAgLy8gU0VPIGRhdGEgdGFibGVcclxuICAgIGF3YWl0IGNsaWVudC5xdWVyeShgXHJcbiAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHNlb19kYXRhIChcclxuICAgICAgICBpZCBTRVJJQUwgUFJJTUFSWSBLRVksXHJcbiAgICAgICAgcGFnZSBWQVJDSEFSKDEwMCkgTk9UIE5VTEwsXHJcbiAgICAgICAgdGl0bGUgVkFSQ0hBUigyNTUpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uIFRFWFQsXHJcbiAgICAgICAga2V5d29yZHMgVEVYVCxcclxuICAgICAgICBvZ190aXRsZSBWQVJDSEFSKDI1NSksXHJcbiAgICAgICAgb2dfZGVzY3JpcHRpb24gVEVYVCxcclxuICAgICAgICBvZ19pbWFnZSBWQVJDSEFSKDUwMCksXHJcbiAgICAgICAgY2Fub25pY2FsX3VybCBWQVJDSEFSKDUwMCksXHJcbiAgICAgICAgY3JlYXRlZF9hdCBUSU1FU1RBTVAgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUCxcclxuICAgICAgICB1cGRhdGVkX2F0IFRJTUVTVEFNUCBERUZBVUxUIENVUlJFTlRfVElNRVNUQU1QXHJcbiAgICAgIClcclxuICAgIGApO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdEYXRhYmFzZSBzY2hlbWEgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5Jyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluaXRpYWxpemluZyBkYXRhYmFzZTonLCBlcnJvcik7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgY2xpZW50LnJlbGVhc2UoKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlBvb2wiLCJwb29sIiwiY29ubmVjdGlvblN0cmluZyIsInByb2Nlc3MiLCJlbnYiLCJEQVRBQkFTRV9VUkwiLCJzc2wiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJpbml0RGF0YWJhc2UiLCJjbGllbnQiLCJjb25uZWN0IiwicXVlcnkiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJyZWxlYXNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CWilso%5Creal%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CWilso%5Creal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();