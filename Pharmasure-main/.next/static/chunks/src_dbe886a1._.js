(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/pharma/constants.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "EXPIRING_SOON_DAYS": (()=>EXPIRING_SOON_DAYS)
});
const EXPIRING_SOON_DAYS = 30;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/pharma/helpers.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "formatDate": (()=>formatDate),
    "getDaysDiff": (()=>getDaysDiff),
    "getStatus": (()=>getStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pharma/constants.ts [app-client] (ecmascript)");
;
const formatDate = (date)=>{
    if (!date) return "";
    try {
        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return "";
        return d.toISOString().split('T')[0];
    } catch (error) {
        return "";
    }
};
const getDaysDiff = (expiryDate)=>{
    if (!expiryDate) return Infinity;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    if (isNaN(expiry.getTime())) return Infinity;
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
const getStatus = (expiryDate)=>{
    const diffDays = getDaysDiff(expiryDate);
    if (diffDays === Infinity) return {
        text: 'Safe',
        color: 'text-green-500'
    };
    if (diffDays < 0) return {
        text: 'Expired',
        color: 'text-red-500'
    };
    if (diffDays <= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXPIRING_SOON_DAYS"]) return {
        text: 'Expiring soon',
        color: 'text-orange-500'
    };
    return {
        text: 'Safe',
        color: 'text-green-500'
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/pharma/Icons.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CameraIcon": (()=>CameraIcon),
    "DashboardIcon": (()=>DashboardIcon),
    "DollarSignIcon": (()=>DollarSignIcon),
    "ExclamationIcon": (()=>ExclamationIcon),
    "InventoryIcon": (()=>InventoryIcon),
    "MedicineBoxIcon": (()=>MedicineBoxIcon),
    "PlusIcon": (()=>PlusIcon),
    "ScanIcon": (()=>ScanIcon),
    "SearchIcon": (()=>SearchIcon),
    "WarningTriangleIcon": (()=>WarningTriangleIcon),
    "XIcon": (()=>XIcon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ScanIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 7V5a2 2 0 0 1 2-2h2"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 3,
                columnNumber: 219
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M17 3h2a2 2 0 0 1 2 2v2"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 3,
                columnNumber: 254
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21 17v2a2 2 0 0 1-2 2h-2"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 3,
                columnNumber: 290
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 21H5a2 2 0 0 1-2-2v-2"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 3,
                columnNumber: 328
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 12h10"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 3,
                columnNumber: 365
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 3,
        columnNumber: 41
    }, this);
_c = ScanIcon;
const SearchIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "11",
                cy: "11",
                r: "8"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 4,
                columnNumber: 221
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "21",
                y1: "21",
                x2: "16.65",
                y2: "16.65"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 4,
                columnNumber: 253
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 4,
        columnNumber: 43
    }, this);
_c1 = SearchIcon;
const XIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "18",
                y1: "6",
                x2: "6",
                y2: "18"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 5,
                columnNumber: 216
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "6",
                y1: "6",
                x2: "18",
                y2: "18"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 5,
                columnNumber: 259
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 5,
        columnNumber: 38
    }, this);
_c2 = XIcon;
const PlusIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "28",
        height: "28",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "3",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "12",
                y1: "5",
                x2: "12",
                y2: "19"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 6,
                columnNumber: 219
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "5",
                y1: "12",
                x2: "19",
                y2: "12"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 6,
                columnNumber: 263
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 6,
        columnNumber: 41
    }, this);
_c3 = PlusIcon;
const InventoryIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 7,
                columnNumber: 224
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 7,
                columnNumber: 282
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 7,
        columnNumber: 46
    }, this);
_c4 = InventoryIcon;
const DashboardIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "18",
                y1: "20",
                x2: "18",
                y2: "10"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 8,
                columnNumber: 224
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "12",
                y1: "20",
                x2: "12",
                y2: "4"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 8,
                columnNumber: 269
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "6",
                y1: "20",
                x2: "6",
                y2: "14"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 8,
                columnNumber: 313
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 8,
        columnNumber: 46
    }, this);
_c5 = DashboardIcon;
const MedicineBoxIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v2"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 9,
                columnNumber: 226
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21 14v-4"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 9,
                columnNumber: 309
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 14v-4"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 9,
                columnNumber: 336
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 18.17l-7-4V8.17l7 4 7-4v4.17"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 9,
                columnNumber: 362
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 22l7-4"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 9,
                columnNumber: 412
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 22l-7-4"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 9,
                columnNumber: 440
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 13l7-4"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 9,
                columnNumber: 469
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 13l-7-4"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 9,
                columnNumber: 497
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 9,
        columnNumber: 48
    }, this);
_c6 = MedicineBoxIcon;
const ExclamationIcon = ({ className = "text-red-600" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "10"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 10,
                columnNumber: 304
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "12",
                y1: "8",
                x2: "12",
                y2: "12"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 10,
                columnNumber: 344
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "12",
                y1: "16",
                x2: "12.01",
                y2: "16"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 10,
                columnNumber: 388
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 10,
        columnNumber: 102
    }, this);
_c7 = ExclamationIcon;
const WarningTriangleIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "text-orange-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 11,
                columnNumber: 260
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "12",
                y1: "9",
                x2: "12",
                y2: "13"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 11,
                columnNumber: 366
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "12",
                y1: "17",
                x2: "12.01",
                y2: "17"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 11,
                columnNumber: 410
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 11,
        columnNumber: 52
    }, this);
_c8 = WarningTriangleIcon;
const DollarSignIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "text-green-600",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "12",
                y1: "1",
                x2: "12",
                y2: "23"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 12,
                columnNumber: 254
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 12,
                columnNumber: 298
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 12,
        columnNumber: 47
    }, this);
_c9 = DollarSignIcon;
const CameraIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 13,
                columnNumber: 221
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "13",
                r: "4"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/Icons.tsx",
                lineNumber: 13,
                columnNumber: 320
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/Icons.tsx",
        lineNumber: 13,
        columnNumber: 43
    }, this);
_c10 = CameraIcon;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "ScanIcon");
__turbopack_context__.k.register(_c1, "SearchIcon");
__turbopack_context__.k.register(_c2, "XIcon");
__turbopack_context__.k.register(_c3, "PlusIcon");
__turbopack_context__.k.register(_c4, "InventoryIcon");
__turbopack_context__.k.register(_c5, "DashboardIcon");
__turbopack_context__.k.register(_c6, "MedicineBoxIcon");
__turbopack_context__.k.register(_c7, "ExclamationIcon");
__turbopack_context__.k.register(_c8, "WarningTriangleIcon");
__turbopack_context__.k.register(_c9, "DollarSignIcon");
__turbopack_context__.k.register(_c10, "CameraIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/pharma/InventoryView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pharma/helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pharma/Icons.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const HEADER_HEIGHT_PX = 112;
const FILTER_BAR_HEIGHT_PX = 53;
const ALPHABET_BAR_HEIGHT_PX = 48;
const TOTAL_STICKY_HEIGHT = HEADER_HEIGHT_PX + FILTER_BAR_HEIGHT_PX + ALPHABET_BAR_HEIGHT_PX;
const InventoryView = ({ meds, onOpenDetailSheet, onLoadSampleData })=>{
    _s();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('All drugs');
    const groupRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const filteredMeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InventoryView.useMemo[filteredMeds]": ()=>{
            return meds.filter({
                "InventoryView.useMemo[filteredMeds]": (med)=>activeFilter === 'All drugs' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatus"])(med.expiryDate).text === activeFilter
            }["InventoryView.useMemo[filteredMeds]"]).filter({
                "InventoryView.useMemo[filteredMeds]": (med)=>med.name.toLowerCase().includes(searchTerm.toLowerCase())
            }["InventoryView.useMemo[filteredMeds]"]);
        }
    }["InventoryView.useMemo[filteredMeds]"], [
        meds,
        activeFilter,
        searchTerm
    ]);
    const groupedMeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InventoryView.useMemo[groupedMeds]": ()=>{
            const sortedMeds = [
                ...filteredMeds
            ].sort({
                "InventoryView.useMemo[groupedMeds].sortedMeds": (a, b)=>a.name.localeCompare(b.name)
            }["InventoryView.useMemo[groupedMeds].sortedMeds"]);
            return sortedMeds.reduce({
                "InventoryView.useMemo[groupedMeds]": (acc, med)=>{
                    let firstChar = med.name[0].toUpperCase();
                    if (!isNaN(parseInt(firstChar))) firstChar = '#';
                    if (!acc[firstChar]) acc[firstChar] = [];
                    acc[firstChar].push(med);
                    return acc;
                }
            }["InventoryView.useMemo[groupedMeds]"], {});
        }
    }["InventoryView.useMemo[groupedMeds]"], [
        filteredMeds
    ]);
    const alphabet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InventoryView.useMemo[alphabet]": ()=>[
                '#',
                ...Array.from({
                    length: 26
                }, {
                    "InventoryView.useMemo[alphabet]": (_, i)=>String.fromCharCode(65 + i)
                }["InventoryView.useMemo[alphabet]"])
            ]
    }["InventoryView.useMemo[alphabet]"], []);
    const sortedGroupKeys = Object.keys(groupedMeds).sort((a, b)=>{
        if (a === '#') return -1;
        if (b === '#') return 1;
        return a.localeCompare(b);
    });
    const handleJumpTo = (letter)=>{
        groupRefs.current[letter]?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "h-28 border-b border-gray-200 sticky top-0 bg-white z-20 flex flex-col justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-gray-900 mb-4",
                            children: "Pharmasure"
                        }, void 0, false, {
                            fileName: "[project]/src/components/pharma/InventoryView.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchIcon"], {}, void 0, false, {
                                        fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                        lineNumber: 57,
                                        columnNumber: 98
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                    lineNumber: 57,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search for Drug...",
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value),
                                    className: "w-full bg-gray-100 border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                    lineNumber: 58,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pharma/InventoryView.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/InventoryView.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 flex space-x-2 border-b border-gray-200 sticky bg-white z-20 overflow-x-auto scrollbar-hide",
                style: {
                    top: `${HEADER_HEIGHT_PX}px`
                },
                children: [
                    'All drugs',
                    'Expired',
                    'Expiring soon',
                    'Safe'
                ].map((filter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveFilter(filter),
                        className: `px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${activeFilter === filter ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`,
                        children: filter
                    }, filter, false, {
                        fileName: "[project]/src/components/pharma/InventoryView.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/InventoryView.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bg-white z-20 border-b border-gray-200",
                style: {
                    top: `${HEADER_HEIGHT_PX + FILTER_BAR_HEIGHT_PX}px`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center px-2 py-2 overflow-x-auto scrollbar-hide",
                    children: alphabet.map((letter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleJumpTo(letter),
                            className: "px-2.5 py-1 text-sm font-semibold text-gray-500 hover:text-blue-600 rounded disabled:opacity-30 disabled:hover:text-gray-500",
                            disabled: !groupedMeds[letter],
                            children: letter
                        }, letter, false, {
                            fileName: "[project]/src/components/pharma/InventoryView.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/InventoryView.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-grow overflow-y-auto",
                style: {
                    paddingTop: `${TOTAL_STICKY_HEIGHT}px`,
                    marginTop: `-${TOTAL_STICKY_HEIGHT}px`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 pb-20",
                    children: meds.length === 0 && activeFilter === 'All drugs' && !searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-16 px-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-sm mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "mx-auto h-16 w-16 text-gray-400 mb-4",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                        lineNumber: 98,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                    lineNumber: 97,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-gray-900 mb-2",
                                    children: "Your Inventory is Empty"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                    lineNumber: 100,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mb-6",
                                    children: "Start adding medications using the + button below, or load sample data to explore the app."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                    lineNumber: 101,
                                    columnNumber: 25
                                }, this),
                                onLoadSampleData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onLoadSampleData,
                                    className: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-5 w-5 mr-2",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                                lineNumber: 108,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                            lineNumber: 107,
                                            columnNumber: 33
                                        }, this),
                                        "Load Sample Data"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                    lineNumber: 103,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pharma/InventoryView.tsx",
                            lineNumber: 96,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/pharma/InventoryView.tsx",
                        lineNumber: 95,
                        columnNumber: 17
                    }, this) : sortedGroupKeys.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-gray-500 mt-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "No medications match your criteria."
                        }, void 0, false, {
                            fileName: "[project]/src/components/pharma/InventoryView.tsx",
                            lineNumber: 116,
                            columnNumber: 66
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/pharma/InventoryView.tsx",
                        lineNumber: 116,
                        columnNumber: 17
                    }, this) : sortedGroupKeys.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    ref: (el)=>{
                                        groupRefs.current[group] = el;
                                    },
                                    className: "text-sm font-bold text-gray-400 mb-2 border-b border-gray-200 pb-1 pt-4 sticky bg-white z-10",
                                    style: {
                                        top: 0
                                    },
                                    children: group
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                    lineNumber: 120,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    children: groupedMeds[group].map((med)=>{
                                        const status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatus"])(med.expiryDate);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            onClick: ()=>onOpenDetailSheet(med),
                                            className: "flex justify-between items-center py-2.5 cursor-pointer hover:bg-gray-100 rounded-md px-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: med.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-sm font-semibold ${status.color}`,
                                                    children: status.text
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, med.id, true, {
                                            fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                            lineNumber: 125,
                                            columnNumber: 37
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                                    lineNumber: 121,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, group, true, {
                            fileName: "[project]/src/components/pharma/InventoryView.tsx",
                            lineNumber: 119,
                            columnNumber: 21
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/pharma/InventoryView.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/InventoryView.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(InventoryView, "YslO9bA04s/lEnHd66dIrQz3YoY=");
_c = InventoryView;
const __TURBOPACK__default__export__ = InventoryView;
var _c;
__turbopack_context__.k.register(_c, "InventoryView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/pharma/MetricCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const MetricCard = ({ title, value, icon, iconBg, iconColor })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-gray-500",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/pharma/MetricCard.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-8 h-8 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`,
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/src/components/pharma/MetricCard.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pharma/MetricCard.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-2xl font-bold text-gray-900",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/MetricCard.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/MetricCard.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
};
_c = MetricCard;
const __TURBOPACK__default__export__ = MetricCard;
var _c;
__turbopack_context__.k.register(_c, "MetricCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/pharma/AlertList.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pharma/helpers.ts [app-client] (ecmascript)");
;
;
const AlertList = ({ title, icon, count, meds })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-4 rounded-xl border border-gray-200 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            icon,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-lg font-semibold text-gray-800",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/components/pharma/AlertList.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pharma/AlertList.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full",
                        children: [
                            count,
                            " items"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pharma/AlertList.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pharma/AlertList.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            meds.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-h-64 overflow-y-auto pr-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-2",
                    children: meds.map((med)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "text-sm text-gray-600 flex justify-between items-center p-2 rounded-md hover:bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-gray-800",
                                            children: med.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/AlertList.tsx",
                                            lineNumber: 28,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500",
                                            children: [
                                                "Expires: ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(med.expiryDate)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pharma/AlertList.tsx",
                                            lineNumber: 29,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pharma/AlertList.tsx",
                                    lineNumber: 27,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: [
                                        med.stock,
                                        " pcs"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pharma/AlertList.tsx",
                                    lineNumber: 31,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, med.id, true, {
                            fileName: "[project]/src/components/pharma/AlertList.tsx",
                            lineNumber: 26,
                            columnNumber: 21
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/pharma/AlertList.tsx",
                    lineNumber: 24,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/AlertList.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-500 text-center py-4",
                children: "Nothing to show here."
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/AlertList.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/AlertList.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
};
_c = AlertList;
const __TURBOPACK__default__export__ = AlertList;
var _c;
__turbopack_context__.k.register(_c, "AlertList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/pharma/DashboardView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pharma/helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pharma/Icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pharma/MetricCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$AlertList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pharma/AlertList.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
// Generate trend data based on current medication statuses
const generateTrendData = (meds)=>{
    const today = new Date();
    const expired = meds.filter((m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatus"])(m.expiryDate).text === 'Expired').length;
    const expiringSoon = meds.filter((m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatus"])(m.expiryDate).text === 'Expiring soon').length;
    return {
        'Last 7 Days': Array.from({
            length: 7
        }, (_, i)=>({
                name: new Date(today.getTime() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en', {
                    weekday: 'short'
                }),
                'Expiring Soon': Math.floor(expiringSoon * (0.8 + Math.random() * 0.4) / 7),
                'Expired': Math.floor(expired * (0.8 + Math.random() * 0.4) / 7)
            })),
        'Month': Array.from({
            length: 4
        }, (_, i)=>({
                name: `Week ${i + 1}`,
                'Expiring Soon': Math.floor(expiringSoon * (0.2 + Math.random() * 0.3)),
                'Expired': Math.floor(expired * (0.2 + Math.random() * 0.3))
            })),
        'Quarter': Array.from({
            length: 3
        }, (_, i)=>({
                name: new Date(today.getFullYear(), today.getMonth() - (2 - i), 1).toLocaleDateString('en', {
                    month: 'short'
                }),
                'Expiring Soon': Math.floor(expiringSoon * (0.25 + Math.random() * 0.35)),
                'Expired': Math.floor(expired * (0.25 + Math.random() * 0.35))
            })),
        'Year': Array.from({
            length: 4
        }, (_, i)=>({
                name: `Q${i + 1}`,
                'Expiring Soon': Math.floor(expiringSoon * (0.2 + Math.random() * 0.3)),
                'Expired': Math.floor(expired * (0.2 + Math.random() * 0.3))
            }))
    };
};
const DashboardView = ({ meds })=>{
    _s();
    const [activeTrend, setActiveTrend] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Month');
    const allTrendData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardView.useMemo[allTrendData]": ()=>generateTrendData(meds)
    }["DashboardView.useMemo[allTrendData]"], [
        meds
    ]);
    const analysisData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardView.useMemo[analysisData]": ()=>{
            const expired = meds.filter({
                "DashboardView.useMemo[analysisData].expired": (m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatus"])(m.expiryDate).text === 'Expired'
            }["DashboardView.useMemo[analysisData].expired"]);
            const expiringSoon = meds.filter({
                "DashboardView.useMemo[analysisData].expiringSoon": (m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatus"])(m.expiryDate).text === 'Expiring soon'
            }["DashboardView.useMemo[analysisData].expiringSoon"]);
            const totalValue = meds.reduce({
                "DashboardView.useMemo[analysisData].totalValue": (acc, med)=>{
                    // Mock price calculation for demonstration
                    const mockPrice = med.name.length % 5 * 10 + 50; // Price between 50-90
                    return acc + med.stock * mockPrice;
                }
            }["DashboardView.useMemo[analysisData].totalValue"], 0);
            return {
                totalMeds: meds.length,
                expiredCount: expired.length,
                expiringSoonCount: expiringSoon.length,
                totalValue,
                expiredMeds: expired.sort({
                    "DashboardView.useMemo[analysisData]": (a, b)=>new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
                }["DashboardView.useMemo[analysisData]"]),
                expiringSoonMeds: expiringSoon.sort({
                    "DashboardView.useMemo[analysisData]": (a, b)=>new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
                }["DashboardView.useMemo[analysisData]"])
            };
        }
    }["DashboardView.useMemo[analysisData]"], [
        meds
    ]);
    if (meds.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-semibold text-gray-700 mb-2",
                    children: "No Medications Yet"
                }, void 0, false, {
                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-center",
                    children: "Start adding medications to see analytics and insights here."
                }, void 0, false, {
                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                    lineNumber: 68,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/pharma/DashboardView.tsx",
            lineNumber: 66,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "h-28 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold text-gray-900",
                    children: "Reports & Analytics"
                }, void 0, false, {
                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/DashboardView.tsx",
                lineNumber: 75,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-grow overflow-y-auto pb-20 bg-gray-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-gray-800 mb-4",
                                    children: "Key Metrics"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                    lineNumber: 81,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            title: "Total Medicines",
                                            value: analysisData.totalMeds,
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicineBoxIcon"], {}, void 0, false, {
                                                fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                lineNumber: 83,
                                                columnNumber: 102
                                            }, void 0),
                                            iconBg: "bg-blue-100",
                                            iconColor: "text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                            lineNumber: 83,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            title: "Expired",
                                            value: analysisData.expiredCount,
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExclamationIcon"], {}, void 0, false, {
                                                fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                lineNumber: 84,
                                                columnNumber: 97
                                            }, void 0),
                                            iconBg: "bg-red-100",
                                            iconColor: "text-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                            lineNumber: 84,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            title: "Expiring Soon",
                                            value: analysisData.expiringSoonCount,
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WarningTriangleIcon"], {}, void 0, false, {
                                                fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                lineNumber: 85,
                                                columnNumber: 108
                                            }, void 0),
                                            iconBg: "bg-orange-100",
                                            iconColor: "text-orange-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                            lineNumber: 85,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            title: "Total Value",
                                            value: `₹${analysisData.totalValue.toLocaleString('en-IN')}`,
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DollarSignIcon"], {}, void 0, false, {
                                                fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                lineNumber: 86,
                                                columnNumber: 129
                                            }, void 0),
                                            iconBg: "bg-green-100",
                                            iconColor: "text-green-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                            lineNumber: 86,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                    lineNumber: 82,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pharma/DashboardView.tsx",
                            lineNumber: 80,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl p-4 border border-gray-200 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold mb-4 text-lg text-gray-700",
                                    children: "Expiry Trends"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                    lineNumber: 91,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex space-x-2 overflow-x-auto scrollbar-hide mb-4",
                                    children: [
                                        'Last 7 Days',
                                        'Month',
                                        'Quarter',
                                        'Year'
                                    ].map((filter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveTrend(filter),
                                            className: `px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeTrend === filter ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'}`,
                                            children: filter
                                        }, filter, false, {
                                            fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                            lineNumber: 94,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                    lineNumber: 92,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '100%',
                                        height: 250
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                            data: allTrendData[activeTrend],
                                            margin: {
                                                top: 5,
                                                right: 0,
                                                left: -20,
                                                bottom: 5
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                    strokeDasharray: "3 3",
                                                    vertical: false,
                                                    stroke: "#e5e7eb"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                    dataKey: "name",
                                                    tick: {
                                                        fontSize: 12,
                                                        fill: '#6b7280'
                                                    },
                                                    axisLine: false,
                                                    tickLine: false
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                    tick: {
                                                        fontSize: 12,
                                                        fill: '#6b7280'
                                                    },
                                                    axisLine: false,
                                                    tickLine: false
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    contentStyle: {
                                                        backgroundColor: '#ffffff',
                                                        border: '1px solid #e5e7eb',
                                                        borderRadius: '0.5rem'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                    iconType: "circle",
                                                    wrapperStyle: {
                                                        fontSize: '14px',
                                                        paddingTop: '10px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                    dataKey: "Expiring Soon",
                                                    fill: "#f97316",
                                                    radius: [
                                                        4,
                                                        4,
                                                        0,
                                                        0
                                                    ],
                                                    barSize: 15
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                    dataKey: "Expired",
                                                    fill: "#ef4444",
                                                    radius: [
                                                        4,
                                                        4,
                                                        0,
                                                        0
                                                    ],
                                                    barSize: 15
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                            lineNumber: 99,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                        lineNumber: 98,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                    lineNumber: 97,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pharma/DashboardView.tsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$AlertList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    title: "Recently Expired",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExclamationIcon"], {}, void 0, false, {
                                        fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                        lineNumber: 113,
                                        columnNumber: 67
                                    }, void 0),
                                    count: analysisData.expiredCount,
                                    meds: analysisData.expiredMeds
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                    lineNumber: 113,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$AlertList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    title: "Nearing Expiry",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WarningTriangleIcon"], {}, void 0, false, {
                                        fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                        lineNumber: 114,
                                        columnNumber: 65
                                    }, void 0),
                                    count: analysisData.expiringSoonCount,
                                    meds: analysisData.expiringSoonMeds
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                                    lineNumber: 114,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pharma/DashboardView.tsx",
                            lineNumber: 112,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pharma/DashboardView.tsx",
                    lineNumber: 79,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/DashboardView.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
};
_s(DashboardView, "TgJfBGQdBvdFcYhapRC22DUTx1E=");
_c = DashboardView;
const __TURBOPACK__default__export__ = DashboardView;
var _c;
__turbopack_context__.k.register(_c, "DashboardView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/pharma/BottomNavBar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pharma/Icons.tsx [app-client] (ecmascript)");
;
;
const BottomNavBar = ({ activeView, onNavigate, onAdd })=>{
    const navButtonClass = (viewName)=>`flex flex-col items-center justify-center flex-1 p-2 rounded-lg transition-colors ${activeView === viewName ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto h-16 bg-white border-t border-gray-200 flex justify-around items-center z-30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onNavigate('inventory'),
                className: navButtonClass('inventory'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InventoryIcon"], {}, void 0, false, {
                        fileName: "[project]/src/components/pharma/BottomNavBar.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium mt-1",
                        children: "Inventory"
                    }, void 0, false, {
                        fileName: "[project]/src/components/pharma/BottomNavBar.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pharma/BottomNavBar.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onAdd,
                className: "w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center -mt-8 shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 active:scale-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlusIcon"], {}, void 0, false, {
                    fileName: "[project]/src/components/pharma/BottomNavBar.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/BottomNavBar.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onNavigate('dashboard'),
                className: navButtonClass('dashboard'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
                        fileName: "[project]/src/components/pharma/BottomNavBar.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium mt-1",
                        children: "Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/src/components/pharma/BottomNavBar.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pharma/BottomNavBar.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/BottomNavBar.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
};
_c = BottomNavBar;
const __TURBOPACK__default__export__ = BottomNavBar;
var _c;
__turbopack_context__.k.register(_c, "BottomNavBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/ai/flows/data:f58d4d [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"40bd739615acaca313f74c939701fa5a47b9137b49":"analyzeMedicineLabel"},"src/ai/flows/medicine-label-analysis.ts",""] */ __turbopack_context__.s({
    "analyzeMedicineLabel": (()=>analyzeMedicineLabel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var analyzeMedicineLabel = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40bd739615acaca313f74c939701fa5a47b9137b49", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "analyzeMedicineLabel"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vbWVkaWNpbmUtbGFiZWwtYW5hbHlzaXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4ndXNlIHNlcnZlcic7XG5cbi8qKlxuICogQGZpbGVPdmVydmlldyBBbiBBSSBhZ2VudCB0aGF0IGV4dHJhY3RzIGtleSBkZXRhaWxzIGZyb20gYSBtZWRpY2luZSBsYWJlbCBpbWFnZSB1c2luZyBPQ1IuXG4gKlxuICogLSBhbmFseXplTWVkaWNpbmVMYWJlbCAtIEEgZnVuY3Rpb24gdGhhdCBoYW5kbGVzIHRoZSBtZWRpY2luZSBsYWJlbCBhbmFseXNpcy5cbiAqIC0gTWVkaWNpbmVMYWJlbEFuYWx5c2lzSW5wdXQgLSBUaGUgaW5wdXQgdHlwZSBmb3IgdGhlIGFuYWx5emVNZWRpY2luZUxhYmVsIGZ1bmN0aW9uLlxuICogLSBNZWRpY2luZUxhYmVsQW5hbHlzaXNPdXRwdXQgLSBUaGUgcmV0dXJuIHR5cGUgZm9yIHRoZSBhbmFseXplTWVkaWNpbmVMYWJlbCBmdW5jdGlvbi5cbiAqL1xuXG5pbXBvcnQge2FpfSBmcm9tICdAL2FpL2dlbmtpdCc7XG5pbXBvcnQge3p9IGZyb20gJ2dlbmtpdCc7XG5cbmNvbnN0IE1lZGljaW5lTGFiZWxBbmFseXNpc0lucHV0U2NoZW1hID0gei5vYmplY3Qoe1xuICBtZWRpY2luZUltYWdlOiB6XG4gICAgLnN0cmluZygpXG4gICAgLmRlc2NyaWJlKFxuICAgICAgXCJBIHBob3RvIG9mIGEgbWVkaWNpbmUgbGFiZWwsIGFzIGEgZGF0YSBVUkkgdGhhdCBtdXN0IGluY2x1ZGUgYSBNSU1FIHR5cGUgYW5kIHVzZSBCYXNlNjQgZW5jb2RpbmcuIEV4cGVjdGVkIGZvcm1hdDogJ2RhdGE6PG1pbWV0eXBlPjtiYXNlNjQsPGVuY29kZWRfZGF0YT4nLlwiXG4gICAgKSxcbn0pO1xuZXhwb3J0IHR5cGUgTWVkaWNpbmVMYWJlbEFuYWx5c2lzSW5wdXQgPSB6LmluZmVyPHR5cGVvZiBNZWRpY2luZUxhYmVsQW5hbHlzaXNJbnB1dFNjaGVtYT47XG5cbmNvbnN0IE1lZGljaW5lTGFiZWxBbmFseXNpc091dHB1dFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgaXNNZWRpY2luZUxhYmVsOiB6LmJvb2xlYW4oKS5kZXNjcmliZSgnV2hldGhlciB0aGUgaW1hZ2UgYXBwZWFycyB0byBiZSBhIG1lZGljaW5lIGxhYmVsIG9yIGJveC4nKSxcbiAgbWVkaWNpbmVOYW1lOiB6LnN0cmluZygpLmRlc2NyaWJlKCdUaGUgbmFtZSBvZiB0aGUgbWVkaWNpbmUuJyksXG4gIHN0cmVuZ3RoOiB6LnN0cmluZygpLm9wdGlvbmFsKCkuZGVzY3JpYmUoJ1RoZSBzdHJlbmd0aCBvZiB0aGUgbWVkaWNpbmUgKGUuZy4sIDUwMG1nLCAxMG1sKS4gVGhpcyBpcyBvZnRlbiB0aGUgc2FtZSBhcyBkb3NhZ2UuJyksXG4gIG1hbnVmYWN0dXJlcjogei5zdHJpbmcoKS5vcHRpb25hbCgpLmRlc2NyaWJlKCdUaGUgbmFtZSBvZiB0aGUgY29tcGFueSB0aGF0IG1hbnVmYWN0dXJlZCB0aGUgbWVkaWNpbmUuJyksXG4gIG1hbnVmYWN0dXJlRGF0ZTogei5zdHJpbmcoKS5kZXNjcmliZSgnVGhlIG1hbnVmYWN0dXJpbmcgZGF0ZSBmb3VuZCBvbiB0aGUgbGFiZWwgKGUuZy4sIFwiSmFuIDIwMjNcIiwgXCIwMS8yM1wiKS4nKSxcbiAgZXhwaXJ5RGF0ZTogei5zdHJpbmcoKS5kZXNjcmliZSgnVGhlIGV4cGlyeSBkYXRlIGZvdW5kIG9uIHRoZSBsYWJlbCAoZS5nLiwgXCJEZWMgMjAyNVwiLCBcIjEyLzI1XCIpLiBUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLicpLFxuICBiYXRjaE51bWJlcjogei5zdHJpbmcoKS5vcHRpb25hbCgpLmRlc2NyaWJlKCdUaGUgYmF0Y2ggbnVtYmVyIG9mIHRoZSBtZWRpY2luZSwgb2Z0ZW4gbGFiZWxlZCBhcyBcIkIuTm8uXCIgb3IgXCJCYXRjaCBOby5cIicpLFxufSk7XG5leHBvcnQgdHlwZSBNZWRpY2luZUxhYmVsQW5hbHlzaXNPdXRwdXQgPSB6LmluZmVyPHR5cGVvZiBNZWRpY2luZUxhYmVsQW5hbHlzaXNPdXRwdXRTY2hlbWE+O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYW5hbHl6ZU1lZGljaW5lTGFiZWwoXG4gIGlucHV0OiBNZWRpY2luZUxhYmVsQW5hbHlzaXNJbnB1dFxuKTogUHJvbWlzZTxNZWRpY2luZUxhYmVsQW5hbHlzaXNPdXRwdXQ+IHtcbiAgcmV0dXJuIG1lZGljaW5lTGFiZWxBbmFseXNpc0Zsb3coaW5wdXQpO1xufVxuXG5jb25zdCBtZWRpY2luZUxhYmVsQW5hbHlzaXNQcm9tcHQgPSBhaS5kZWZpbmVQcm9tcHQoe1xuICBuYW1lOiAnbWVkaWNpbmVMYWJlbEFuYWx5c2lzUHJvbXB0JyxcbiAgaW5wdXQ6IHtzY2hlbWE6IE1lZGljaW5lTGFiZWxBbmFseXNpc0lucHV0U2NoZW1hfSxcbiAgb3V0cHV0OiB7c2NoZW1hOiBNZWRpY2luZUxhYmVsQW5hbHlzaXNPdXRwdXRTY2hlbWF9LFxuICBwcm9tcHQ6IGBZb3UgYXJlIGFuIEFJIGFzc2lzdGFudCBzcGVjaWFsaXplZCBpbiBhbmFseXppbmcgbWVkaWNpbmUgbGFiZWxzLlxuXG4gIFlvdXIgZmlyc3QgdGFzayBpcyB0byBkZXRlcm1pbmUgaWYgdGhlIHByb3ZpZGVkIGltYWdlIGlzIGEgbWVkaWNpbmUgbGFiZWwsIGJveCwgb3IgY3JpbXAgcGFydCBvZiBhIHRhYmxldCBzdHJpcC5cbiAgLSBJZiBpdCBpcywgc2V0ICdpc01lZGljaW5lTGFiZWwnIHRvIHRydWUgYW5kIGV4dHJhY3QgdGhlIGRldGFpbHMuXG4gIC0gSWYgaXQgaXMgTk9UIGEgbWVkaWNpbmUgbGFiZWwgKGUuZy4sIGEgcGljdHVyZSBvZiBhIGNhciwgYSBsYW5kc2NhcGUsIGEgcGVyc29uKSwgc2V0ICdpc01lZGljaW5lTGFiZWwnIHRvIGZhbHNlIGFuZCBsZWF2ZSB0aGUgb3RoZXIgZmllbGRzIGVtcHR5LlxuXG5cbiAgQW5hbHl6ZSB0aGUgcHJvdmlkZWQgaW1hZ2UgYW5kIGV4dHJhY3QgdGhlIGZvbGxvd2luZyBkZXRhaWxzOlxuICAxLiBUaGUgbmFtZSBvZiB0aGUgbWVkaWNpbmUuXG4gIDIuIFRoZSBzdHJlbmd0aCBvZiB0aGUgbWVkaWNpbmUgKGUuZy4sIDUwMG1nLCAxMG1sKS5cbiAgMy4gVGhlIG1hbnVmYWN0dXJlcidzIG5hbWUuXG4gIDQuIFRoZSBtYW51ZmFjdHVyaW5nIGRhdGUuXG4gIDUuIFRoZSBleHBpcnkgZGF0ZS4gVGhpcyBpcyBhIHJlcXVpcmVkIGZpZWxkLlxuICA2LiBUaGUgYmF0Y2ggbnVtYmVyIChvZnRlbiBsYWJlbGVkIGFzIFwiQi5Oby5cIiBvciBzaW1pbGFyKS5cblxuXG4gIEhlcmUgaXMgdGhlIGltYWdlOlxuICB7e21lZGlhIHVybD1tZWRpY2luZUltYWdlfX1cblxuICBSZXR1cm4gYSBKU09OIG9iamVjdCBjb250YWluaW5nIHRoZSBleHRyYWN0ZWQgZGV0YWlscy4gSWYgYSBkZXRhaWwgaXMgbm90IHZpc2libGUsIHJldHVybiBhbiBlbXB0eSBzdHJpbmcgZm9yIHRoYXQgZmllbGQuXG4gIGAsXG59KTtcblxuY29uc3QgbWVkaWNpbmVMYWJlbEFuYWx5c2lzRmxvdyA9IGFpLmRlZmluZUZsb3coXG4gIHtcbiAgICBuYW1lOiAnbWVkaWNpbmVMYWJlbEFuYWx5c2lzRmxvdycsXG4gICAgaW5wdXRTY2hlbWE6IE1lZGljaW5lTGFiZWxBbmFseXNpc0lucHV0U2NoZW1hLFxuICAgIG91dHB1dFNjaGVtYTogTWVkaWNpbmVMYWJlbEFuYWx5c2lzT3V0cHV0U2NoZW1hLFxuICB9LFxuICBhc3luYyBpbnB1dCA9PiB7XG4gICAgY29uc3Qge291dHB1dH0gPSBhd2FpdCBtZWRpY2luZUxhYmVsQW5hbHlzaXNQcm9tcHQoaW5wdXQpO1xuICAgIHJldHVybiBvdXRwdXQhO1xuICB9XG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJxVEFrQ3NCIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/pharma/MedicationDetailSheet.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pharma/helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$f58d4d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:f58d4d [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pharma/Icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const CameraView = ({ onCapture, onClose, setCameraError })=>{
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraView.useEffect": ()=>{
            let stream = null;
            const startCamera = {
                "CameraView.useEffect.startCamera": async ()=>{
                    try {
                        stream = await navigator.mediaDevices.getUserMedia({
                            video: {
                                facingMode: 'environment'
                            }
                        });
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                        }
                    } catch (err) {
                        console.error("Camera Error:", err);
                        setCameraError("Could not access camera. Please check permissions.");
                        onClose();
                    }
                }
            }["CameraView.useEffect.startCamera"];
            startCamera();
            return ({
                "CameraView.useEffect": ()=>{
                    stream?.getTracks().forEach({
                        "CameraView.useEffect": (track)=>track.stop()
                    }["CameraView.useEffect"]);
                }
            })["CameraView.useEffect"];
        }
    }["CameraView.useEffect"], [
        onClose,
        setCameraError
    ]);
    const handleCapture = ()=>{
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
                canvasRef.current.toBlob((blob)=>{
                    if (blob) {
                        onCapture(new File([
                            blob
                        ], "capture.jpg", {
                            type: "image/jpeg"
                        }));
                    }
                }, 'image/jpeg');
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black z-50 flex flex-col items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                autoPlay: true,
                playsInline: true,
                className: "w-full h-full object-cover"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "hidden"
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "absolute top-5 right-5 text-white bg-black bg-opacity-60 rounded-full py-2 px-4 flex items-center gap-2 text-lg font-semibold hover:bg-opacity-80 transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XIcon"], {}, void 0, false, {
                        fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                        lineNumber: 66,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Back"
                    }, void 0, false, {
                        fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                        lineNumber: 67,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                lineNumber: 62,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-8 flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full mb-4",
                        children: "Position camera over medication package"
                    }, void 0, false, {
                        fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCapture,
                        className: "w-20 h-20 bg-white rounded-full border-4 border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                    }, void 0, false, {
                        fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                lineNumber: 69,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
        lineNumber: 59,
        columnNumber: 9
    }, this);
};
_s(CameraView, "0gwqVvoOV2or9Ql4L8GH2BGn3hc=");
_c = CameraView;
const MedicationDetailSheet = ({ isOpen, med, onSave, onRemove, onClose })=>{
    _s1();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [expiryDate, setExpiryDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [stock, setStock] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isScanning, setIsScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scanError, setScanError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showCamera, setShowCamera] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [manufacturer, setManufacturer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [batchNumber, setBatchNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MedicationDetailSheet.useEffect": ()=>{
            if (isOpen) {
                setName(med?.name || '');
                setExpiryDate((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(med?.expiryDate));
                setStock(med?.stock?.toString() || '');
                setScanError('');
                setShowCamera(false);
            }
        }
    }["MedicationDetailSheet.useEffect"], [
        med,
        isOpen
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        onSave({
            id: med?.id,
            name,
            expiryDate,
            stock: parseInt(stock) || 0
        });
    };
    const handleRemove = ()=>{
        if (med?.id && window.confirm(`Are you sure you want to remove ${med.name}?`)) {
            onRemove(med.id);
        }
    };
    const fileToDataUri = (file)=>{
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = ()=>resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    const handleFileScan = async (file)=>{
        if (!file) return;
        setIsScanning(true);
        setScanError('');
        try {
            const medicineImage = await fileToDataUri(file);
            const analysisResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$f58d4d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["analyzeMedicineLabel"])({
                medicineImage
            });
            if (!analysisResult.isMedicineLabel) {
                setScanError("This doesn't look like a medicine label. Please upload a clear image.");
                toast({
                    title: 'Not a Medicine Label',
                    variant: 'destructive'
                });
                return;
            }
            if (analysisResult.medicineName) setName(analysisResult.medicineName);
            if (analysisResult.expiryDate) setExpiryDate((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(analysisResult.expiryDate));
            if (analysisResult.manufacturer) setManufacturer(analysisResult.manufacturer);
            if (analysisResult.batchNumber) setBatchNumber(analysisResult.batchNumber);
            toast({
                title: 'Scan Successful',
                description: 'Medicine details extracted!'
            });
        } catch (error) {
            console.error('Scan error:', error);
            setScanError(error instanceof Error ? error.message : "An unknown error occurred.");
            toast({
                title: 'Scan Failed',
                variant: 'destructive'
            });
        } finally{
            setIsScanning(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };
    const onCameraCapture = (file)=>{
        setShowCamera(false);
        handleFileScan(file);
    };
    const onFileInputChange = (event)=>{
        const file = event.target.files?.[0];
        if (file) handleFileScan(file);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? 'bg-opacity-40' : 'bg-opacity-0 pointer-events-none'}`,
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            showCamera && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraView, {
                onCapture: onCameraCapture,
                onClose: ()=>setShowCamera(false),
                setCameraError: setScanError
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                lineNumber: 175,
                columnNumber: 22
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out z-50 max-w-md mx-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "flex justify-between items-center pb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-bold text-gray-900",
                                    children: med ? 'Medication Details' : 'Add Medication'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "text-gray-400 hover:text-gray-700",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XIcon"], {}, void 0, false, {
                                        fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                        lineNumber: 182,
                                        columnNumber: 85
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-4 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    accept: "image/*",
                                    ref: fileInputRef,
                                    onChange: onFileInputChange,
                                    className: "hidden"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowCamera(true),
                                    disabled: isScanning,
                                    className: "w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50",
                                    children: isScanning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                                lineNumber: 188,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Scanning..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                                lineNumber: 188,
                                                columnNumber: 104
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraIcon"], {}, void 0, false, {
                                                fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                                lineNumber: 190,
                                                columnNumber: 23
                                            }, this),
                                            " Scan with Camera"
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>fileInputRef.current?.click(),
                                        className: "text-sm text-blue-600 hover:underline font-medium",
                                        children: "Or upload an image"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                        lineNumber: 194,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                scanError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-500 text-sm text-center",
                                    children: scanError
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 198,
                                    columnNumber: 27
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "name",
                                            className: "block text-sm font-medium text-gray-600 mb-1",
                                            children: "Drug Name"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 201,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "name",
                                            type: "text",
                                            value: name,
                                            onChange: (e)=>setName(e.target.value),
                                            className: "w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "expiryDate",
                                            className: "block text-sm font-medium text-gray-600 mb-1",
                                            children: "Expiry Date"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "expiryDate",
                                            type: "date",
                                            value: expiryDate,
                                            onChange: (e)=>setExpiryDate(e.target.value),
                                            className: "w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 206,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "manufacturer",
                                            className: "block text-sm font-medium text-gray-600 mb-1",
                                            children: "Manufacturer"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "manufacturer",
                                            type: "text",
                                            value: manufacturer,
                                            onChange: (e)=>setManufacturer(e.target.value),
                                            className: "w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "batchNumber",
                                            className: "block text-sm font-medium text-gray-600 mb-1",
                                            children: "Batch Number"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 213,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "batchNumber",
                                            type: "text",
                                            value: batchNumber,
                                            onChange: (e)=>setBatchNumber(e.target.value),
                                            className: "w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "stock",
                                            className: "block text-sm font-medium text-gray-600 mb-1",
                                            children: "In Stock (quantity)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "stock",
                                            type: "number",
                                            value: stock,
                                            onChange: (e)=>setStock(e.target.value),
                                            className: "w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col space-y-2 pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors",
                                            children: med ? 'Update Medication' : 'Add to Inventory'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, this),
                                        med && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleRemove,
                                            className: "w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors",
                                            children: "Remove from Inventory"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                            lineNumber: 223,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pharma/MedicationDetailSheet.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s1(MedicationDetailSheet, "EbdXPpvx2uHwbcATXBEaNraZ4wU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c1 = MedicationDetailSheet;
const __TURBOPACK__default__export__ = MedicationDetailSheet;
var _c, _c1;
__turbopack_context__.k.register(_c, "CameraView");
__turbopack_context__.k.register(_c1, "MedicationDetailSheet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/pharmacist-medication-service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "deleteMedication": (()=>deleteMedication),
    "saveMedication": (()=>saveMedication)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
;
async function saveMedication(firestore, userId, medData) {
    const medsCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(firestore, 'users', userId, 'pharmacist_inventory');
    if (medData.id) {
        // Update existing medication
        const medDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(medsCollection, medData.id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(medDocRef, {
            ...medData,
            updatedAt: new Date().toISOString()
        });
        return medData.id;
    } else {
        // Create new medication
        const newMedDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(medsCollection);
        const medication = {
            id: newMedDocRef.id,
            name: medData.name,
            expiryDate: medData.expiryDate,
            stock: medData.stock,
            manufacturer: medData.manufacturer,
            batchNumber: medData.batchNumber,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(newMedDocRef, medication);
        return newMedDocRef.id;
    }
}
async function deleteMedication(firestore, userId, medId) {
    const medDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(firestore, 'users', userId, 'pharmacist_inventory', medId);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])(medDocRef);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/pharma/sample-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "generateSampleMedications": (()=>generateSampleMedications)
});
const generateSampleMedications = ()=>{
    const prefixes = [
        'Liso',
        'Atorva',
        'Metfor',
        'Amlodi',
        'Omepra',
        'Sertra',
        'Fluoxe',
        'Citalo',
        'Parace',
        'Ibupro'
    ];
    const suffixes = [
        'pril',
        'statin',
        'min',
        'pine',
        'zole',
        'line',
        'tine',
        'pram',
        'mol',
        'fen'
    ];
    const strengths = [
        '5mg',
        '10mg',
        '20mg',
        '40mg',
        '50mg',
        '80mg',
        '100mg',
        '250mg',
        '500mg'
    ];
    const medications = [];
    // Create sample medications with guaranteed diversity
    const createMed = (name, daysOffset, stock)=>{
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + daysOffset);
        return {
            name,
            expiryDate: expiryDate.toISOString(),
            stock
        };
    };
    // Add expired medications
    medications.push(createMed('Expirophen 20mg', -15, 30));
    medications.push(createMed('Pastduecillin 50mg', -90, 15));
    medications.push(createMed('Gonebadazole 100mg', -4, 50));
    // Add expiring-soon medications
    medications.push(createMed('Almostix 10mg', 5, 45));
    medications.push(createMed('Soontogo 250mg', 25, 22));
    medications.push(createMed('Limitil 5mg', 1, 60));
    medications.push(createMed('Clocks ticking Forte', 12, 18));
    // Generate additional safe medications
    for(let i = 0; i < 13; i++){
        const name = `${prefixes[i % prefixes.length]}${suffixes[i % suffixes.length]} ${strengths[i % strengths.length]}`;
        const daysOffset = Math.floor(Math.random() * 600) + 60; // 2 months to 2 years
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + daysOffset);
        medications.push({
            name,
            expiryDate: expiryDate.toISOString(),
            stock: Math.floor(Math.random() * 200) + 10
        });
    }
    return medications;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/(pages)/pharmacist-dashboard/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PharmacistDashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$InventoryView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pharma/InventoryView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$DashboardView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pharma/DashboardView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$BottomNavBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pharma/BottomNavBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$MedicationDetailSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pharma/MedicationDetailSheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/firebase/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/firebase/provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8e6e89cb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/esm2017/index-8e6e89cb.js [app-client] (ecmascript) <export p as getAuth>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8e6e89cb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__signOut$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/esm2017/index-8e6e89cb.js [app-client] (ecmascript) <export D as signOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$firestore$2f$use$2d$collection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/firebase/firestore/use-collection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pharmacist$2d$medication$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pharmacist-medication-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pharma/sample-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const LoadingSpinner = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                lineNumber: 23,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-lg text-gray-600",
                children: "Initializing Pharmasure..."
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                lineNumber: 24,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, this);
_c = LoadingSpinner;
function PharmacistDashboard() {
    _s();
    const [selectedMed, setSelectedMed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDetailSheetOpen, setIsDetailSheetOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('inventory');
    const { user, isUserLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const firestore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFirestore"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    // Fetch medications from Firestore
    const medsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemoFirebase"])({
        "PharmacistDashboard.useMemoFirebase[medsQuery]": ()=>{
            if (user && firestore) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(firestore, 'users', user.uid, 'pharmacist_inventory'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('updatedAt', 'desc'));
            }
            return null;
        }
    }["PharmacistDashboard.useMemoFirebase[medsQuery]"], [
        user,
        firestore
    ]);
    const { data: meds, isLoading: isLoadingMeds, error: medsError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$firestore$2f$use$2d$collection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCollection"])(medsQuery);
    const [isLoadingSample, setIsLoadingSample] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Check if user is pharmacist and redirect if not
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PharmacistDashboard.useEffect": ()=>{
            if (!isUserLoading && (!user || user.role !== 'pharmacist')) {
                router.push('/login');
            }
        }
    }["PharmacistDashboard.useEffect"], [
        user,
        isUserLoading,
        router
    ]);
    const openDetailSheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PharmacistDashboard.useCallback[openDetailSheet]": (med)=>{
            setSelectedMed(med);
            setIsDetailSheetOpen(true);
        }
    }["PharmacistDashboard.useCallback[openDetailSheet]"], []);
    const closeDetailSheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PharmacistDashboard.useCallback[closeDetailSheet]": ()=>{
            setIsDetailSheetOpen(false);
            setSelectedMed(null);
        }
    }["PharmacistDashboard.useCallback[closeDetailSheet]"], []);
    const onSave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PharmacistDashboard.useCallback[onSave]": async (medData)=>{
            if (!firestore || !user) {
                toast({
                    title: 'Error',
                    description: 'Please log in to save medications',
                    variant: 'destructive'
                });
                return;
            }
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pharmacist$2d$medication$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveMedication"])(firestore, user.uid, medData);
                toast({
                    title: medData.id ? 'Updated' : 'Added',
                    description: `${medData.name} has been ${medData.id ? 'updated' : 'added to inventory'}`
                });
                closeDetailSheet();
            } catch (error) {
                console.error('Error saving medication:', error);
                toast({
                    title: 'Save Failed',
                    description: 'Could not save medication',
                    variant: 'destructive'
                });
            }
        }
    }["PharmacistDashboard.useCallback[onSave]"], [
        firestore,
        user,
        toast,
        closeDetailSheet
    ]);
    const onRemove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PharmacistDashboard.useCallback[onRemove]": async (medId)=>{
            if (!firestore || !user) return;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pharmacist$2d$medication$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteMedication"])(firestore, user.uid, medId);
                toast({
                    title: 'Removed',
                    description: 'Medication removed from inventory'
                });
                closeDetailSheet();
            } catch (error) {
                console.error('Error removing medication:', error);
                toast({
                    title: 'Remove Failed',
                    description: 'Could not remove medication',
                    variant: 'destructive'
                });
            }
        }
    }["PharmacistDashboard.useCallback[onRemove]"], [
        firestore,
        user,
        toast,
        closeDetailSheet
    ]);
    const handleLoadSampleData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PharmacistDashboard.useCallback[handleLoadSampleData]": async ()=>{
            if (!firestore || !user || isLoadingSample) return;
            setIsLoadingSample(true);
            try {
                const sampleMeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pharma$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSampleMedications"])();
                // Save all sample medications
                for (const med of sampleMeds){
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pharmacist$2d$medication$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveMedication"])(firestore, user.uid, med);
                }
                toast({
                    title: 'Sample Data Loaded',
                    description: `${sampleMeds.length} medications added to your inventory`
                });
            } catch (error) {
                console.error('Error loading sample data:', error);
                toast({
                    title: 'Load Failed',
                    description: 'Could not load sample data',
                    variant: 'destructive'
                });
            } finally{
                setIsLoadingSample(false);
            }
        }
    }["PharmacistDashboard.useCallback[handleLoadSampleData]"], [
        firestore,
        user,
        isLoadingSample,
        toast
    ]);
    const handleLogout = async ()=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8e6e89cb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__["getAuth"])();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8e6e89cb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__signOut$3e$__["signOut"])(auth);
        router.push('/login');
    };
    if (isUserLoading || isLoadingMeds) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingSpinner, {}, void 0, false, {
            fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
            lineNumber: 135,
            columnNumber: 12
        }, this);
    }
    if (medsError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-screen bg-gray-50",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg text-red-600",
                    children: "Error loading medications"
                }, void 0, false, {
                    fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: ()=>router.push('/login'),
                    className: "mt-4",
                    children: "Back to Login"
                }, void 0, false, {
                    fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
            lineNumber: 140,
            columnNumber: 7
        }, this);
    }
    if (!user || user.role !== 'pharmacist') {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-100 text-gray-800 min-h-screen font-sans flex justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md bg-white shadow-lg flex flex-col relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-4 right-4 z-30",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        onClick: handleLogout,
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                                lineNumber: 162,
                                columnNumber: 15
                            }, this),
                            "Logout"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                        lineNumber: 156,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, this),
                activeView === 'inventory' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$InventoryView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    meds: meds || [],
                    onOpenDetailSheet: openDetailSheet,
                    onLoadSampleData: !isLoadingSample ? handleLoadSampleData : undefined
                }, void 0, false, {
                    fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                    lineNumber: 168,
                    columnNumber: 15
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$DashboardView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    meds: meds || []
                }, void 0, false, {
                    fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                    lineNumber: 174,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$BottomNavBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    activeView: activeView,
                    onNavigate: setActiveView,
                    onAdd: ()=>openDetailSheet(null)
                }, void 0, false, {
                    fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                    lineNumber: 177,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pharma$2f$MedicationDetailSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    isOpen: isDetailSheetOpen,
                    med: selectedMed,
                    onSave: onSave,
                    onRemove: onRemove,
                    onClose: closeDetailSheet
                }, void 0, false, {
                    fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
                    lineNumber: 183,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(pages)/pharmacist-dashboard/page.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
_s(PharmacistDashboard, "8NZnF1RNV9YRGQp2xQHv1y9rBUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFirestore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemoFirebase"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$firestore$2f$use$2d$collection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCollection"]
    ];
});
_c1 = PharmacistDashboard;
var _c, _c1;
__turbopack_context__.k.register(_c, "LoadingSpinner");
__turbopack_context__.k.register(_c1, "PharmacistDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_dbe886a1._.js.map