// Original file: src/infra/grpcClient/proto/productService.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetProductsRequest as _productServicePackage_GetProductsRequest, GetProductsRequest__Output as _productServicePackage_GetProductsRequest__Output } from '../productServicePackage/GetProductsRequest';
import type { GetProductsResponse as _productServicePackage_GetProductsResponse, GetProductsResponse__Output as _productServicePackage_GetProductsResponse__Output } from '../productServicePackage/GetProductsResponse';

export interface productServiceClient extends grpc.Client {
  GetProducts(argument: _productServicePackage_GetProductsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_productServicePackage_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  GetProducts(argument: _productServicePackage_GetProductsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_productServicePackage_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  GetProducts(argument: _productServicePackage_GetProductsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_productServicePackage_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  GetProducts(argument: _productServicePackage_GetProductsRequest, callback: grpc.requestCallback<_productServicePackage_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  getProducts(argument: _productServicePackage_GetProductsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_productServicePackage_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  getProducts(argument: _productServicePackage_GetProductsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_productServicePackage_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  getProducts(argument: _productServicePackage_GetProductsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_productServicePackage_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  getProducts(argument: _productServicePackage_GetProductsRequest, callback: grpc.requestCallback<_productServicePackage_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface productServiceHandlers extends grpc.UntypedServiceImplementation {
  GetProducts: grpc.handleUnaryCall<_productServicePackage_GetProductsRequest__Output, _productServicePackage_GetProductsResponse>;
  
}

export interface productServiceDefinition extends grpc.ServiceDefinition {
  GetProducts: MethodDefinition<_productServicePackage_GetProductsRequest, _productServicePackage_GetProductsResponse, _productServicePackage_GetProductsRequest__Output, _productServicePackage_GetProductsResponse__Output>
}
