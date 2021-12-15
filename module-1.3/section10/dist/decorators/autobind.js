export function Autobind(_, _2, descriptor) {
    const orgMethod = descriptor.value;
    const newDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const boundFn = orgMethod.bind(this);
            return boundFn;
        },
    };
    return newDescriptor;
}
//# sourceMappingURL=autobind.js.map