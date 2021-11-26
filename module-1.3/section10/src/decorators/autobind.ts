
export function Autobind(
  _: any,
  _2: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const orgMethod = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      const boundFn = orgMethod.bind(this);
      return boundFn;
    },
  };
  return newDescriptor;
} 