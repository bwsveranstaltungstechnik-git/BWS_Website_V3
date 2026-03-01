# Database Schema Reference

This file contains the core TypeScript interfaces that define the shape of the BWS Lager database.

## Core Models

### InventoryItem
```typescript
export interface InventoryItem {
    id: string; // UUID
    name: string;
    description?: string;
    category: string;
    serialNumber?: string;
    condition: 'OK' | 'DEFECT' | 'MAINTENANCE';
    status: 'AVAILABLE' | 'CHECKED_OUT' | 'MAINTENANCE' | 'DEFECTIVE' | 'ARCHIVED' | 'RENTED';
    parentId?: string; // If item is inside a case/container
    storageLocation?: string; 
    barcode?: string;
    owner?: string; // Company ID
    isBulk?: boolean; // For cables/accessories
    quantity?: {
        total: number;
        available: number;
    };
}
```

### Job
```typescript
export interface Job {
    id: string;
    name: string;
    startDate: string; // ISO
    endDate: string; // ISO
    status: 'PLANNING' | 'RESERVED' | 'PREPARED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
    itemIds: string[];
    company?: string;
}
```
