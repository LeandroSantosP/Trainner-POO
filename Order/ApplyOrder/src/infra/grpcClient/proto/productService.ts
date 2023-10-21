import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { productServiceClient as _productServicePackage_productServiceClient, productServiceDefinition as _productServicePackage_productServiceDefinition } from './productServicePackage/productService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  productServicePackage: {
    GetProductsRequest: MessageTypeDefinition
    GetProductsResponse: MessageTypeDefinition
    Product: MessageTypeDefinition
    productService: SubtypeConstructor<typeof grpc.Client, _productServicePackage_productServiceClient> & { service: _productServicePackage_productServiceDefinition }
  }
}

