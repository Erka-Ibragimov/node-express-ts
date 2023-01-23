// function Component(id: number) {
// 	console.log('init');
// 	return (target: Function) => {
// 		console.log('run');
// 		target.prototype.id = id;
// 	};
// }

// function Logger() {
// 	console.log('init logger');
// 	return (target: Function) => {
// 		console.log('run logger');
// 	};
// }

// function Method(targer: object, propertyKey: string, propertyDesctiptor: PropertyDescriptor) {
// 	console.log(propertyKey);
// 	const oldValue = propertyDesctiptor.value;
// 	propertyDesctiptor.value = function (...args: any[]) {
// 		return args[0] * 10;
// 	};
// }

// function Prop(target: object, propertyKey: string) {
// 	let value: number;
// 	const getter = () => {
// 		console.log('Get');
// 		return value;
// 	};
// 	const setter = (newValue: number) => {
// 		console.log('Set');
// 		return newValue;
// 	};

// 	Object.defineProperty(target, propertyKey, {
// 		get: getter,
// 		set: setter,
// 	});
// }

// function Param(target: object, propertyKey: string, index: number) {
// 	console.log(propertyKey);
// 	console.log(index);
// }

// @Logger()
// @Component(1)
// export class User {
// 	@Prop id: number;

// 	@Method
// 	updateId(@Param newId: number) {
// 		this.id = newId;
// 		return this.id;
// 	}
// }
// console.log(new User().id);
// console.log(new User().updateId(2));
// ///////////////////////////////////////////////////////////////
// // import "reflect-metadata";
// // function Injectable(key: string) {
// //   return (target: Function) => {
// //     Reflect.defineMetadata(key, 1, target);
// //     const meta = Reflect.getMetadata(key, target);
// //     console.log(meta);
// //   };
// // }

// // function Prop(target: Object, name: string) {}

// // @Injectable("C")
// // export class C {
// //   @Prop prop: number;
// // }

// // @Injectable("D")
// // export class D {
// //   constructor(@Inject('C') c: C) {}
// // }
