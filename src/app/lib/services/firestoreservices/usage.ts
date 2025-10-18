// // examples/usage.ts
// import { Timestamp } from 'firebase/firestore';
// import { FirestoreService } from './fireStore';

// // Create a user
// async function createExampleUser() {
//   await FirestoreService.createUser('user123', {
//     email: 'vendor@example.com',
//     name: 'John Doe',
//     userType: 'vendor'
//   });
// }

// // Create a store
// async function createExampleStore() {
//   const storeId = await FirestoreService.createStore({
//     ownerId: 'user123',
//     storeName: 'Awesome Store',
//     description: 'The best store ever',
//     isActive: true
//   });
//   return storeId;
// }

// // Create a product
// async function createExampleProduct(storeId: string) {
//   const productId = await FirestoreService.createProduct({
//     storeId: storeId,
//     ownerId: 'user123',
//     name: 'Great Product',
//     price: 29.99,
//     category: 'Electronics',
//     images: ['https://example.com/image1.jpg'],
//     stock: 100,
//     isActive: true
//   });
//   return productId;
// }

// // Create an order
// async function createExampleOrder() {
//   const orderId = await FirestoreService.createOrder({
//     customerId: 'customer123',
//     storeId: 'store456',
//     products: [
//       {
//         productId: 'product789',
//         name: 'Great Product',
//         price: 29.99,
//         quantity: 2,
//         images: ['https://example.com/image1.jpg']
//       }
//     ],
//     status: 'pending',
//     totalAmount: 59.98
//   });
//   return orderId;
// }

// // Get store products
// async function getStoreProducts(storeId: string) {
//   const products = await FirestoreService.getProductsByStore(storeId);
//   console.log('Store products:', products);
// }