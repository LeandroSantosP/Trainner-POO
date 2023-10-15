// Original file: src/infra/grpc/proto/productService.proto


export interface Product {
  'productId'?: (string);
  'price'?: (number | string);
  'name'?: (string);
  'weight'?: (number | string);
  'density'?: (number | string);
  'volume'?: (number | string);
  'fare'?: (number | string);
}

export interface Product__Output {
  'productId'?: (string);
  'price'?: (number);
  'name'?: (string);
  'weight'?: (number);
  'density'?: (number);
  'volume'?: (number);
  'fare'?: (number);
}
