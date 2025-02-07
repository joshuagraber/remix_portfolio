"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Progress = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
var react_2 = require("react");
var spin_delay_1 = require("spin-delay");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var icon_tsx_1 = require("./ui/icon.tsx");
function Progress() {
    var transition = (0, react_1.useNavigation)();
    var busy = transition.state !== 'idle';
    var delayedPending = (0, spin_delay_1.useSpinDelay)(busy, {
        delay: 600,
        minDuration: 400
    });
    var ref = (0, react_2.useRef)(null);
    var _a = (0, react_2.useState)(true), animationComplete = _a[0], setAnimationComplete = _a[1];
    (0, react_2.useEffect)(function () {
        if (!ref.current)
            return;
        if (delayedPending)
            setAnimationComplete(false);
        var animationPromises = ref.current
            .getAnimations()
            .map(function (_a) {
            var finished = _a.finished;
            return finished;
        });
        void Promise.allSettled(animationPromises).then(function () {
            if (!delayedPending)
                setAnimationComplete(true);
        });
    }, [delayedPending]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ role: "progressbar", "aria-hidden": delayedPending ? undefined : undefined, "aria-valuetext": delayedPending ? 'Loading' : undefined, className: "fixed inset-x-0 left-0 top-0 z-50 h-[0.20rem] animate-pulse" }, { children: [(0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, misc_tsx_1.cn)('h-full w-0 bg-foreground duration-500 ease-in-out', transition.state === 'idle' &&
                    (animationComplete
                        ? 'transition-none'
                        : 'w-full opacity-0 transition-all'), delayedPending && transition.state === 'submitting' && 'w-5/12', delayedPending && transition.state === 'loading' && 'w-8/12') }), delayedPending && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "absolute flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "update", size: "md", className: "m-1 animate-spin text-foreground", "aria-hidden": true }) })))] })));
}
exports.Progress = Progress;
