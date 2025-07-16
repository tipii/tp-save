export enum Priority {
  URGENT = 'URGENT',
  NORMAL = 'NORMAL',
  ILES = 'ILES',
}

export enum Status {
  PENDING = 'pending',
  READY = 'ready',
  DELIVERING = 'delivering',
}

export enum SortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  REF = 'ref',
  PRIORITY = 'priority',
  STATUS = 'status',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
