"use strict";
exports.__esModule = true;
exports.useToast = void 0;
var react_1 = require("react");
var sonner_1 = require("sonner");
function useToast(toast) {
    (0, react_1.useEffect)(function () {
        if (toast) {
            setTimeout(function () {
                sonner_1.toast[toast.type](toast.title, {
                    id: toast.id,
                    description: toast.description
                });
            }, 0);
        }
    }, [toast]);
}
exports.useToast = useToast;
