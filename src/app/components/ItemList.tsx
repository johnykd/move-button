import React, { memo } from 'react';
import Button from './Button';
import { IFruit } from './types';

interface ItemListProps {
    items: IFruit[];
    onItemClick?: (item: IFruit) => void;
    title: string;
    filter?: string;
}

const ItemList = memo(({ items, onItemClick, title, filter }: ItemListProps) => {
    const filteredItems = filter
        ? items.filter(item => item.type === filter)
        : items;

    return (
        <div className="h-170 w-50 border border-gray-300 p-4 rounded">
            <p className="text-center">{title}</p>
            {filteredItems.map((item) => (
                <div key={item.id}>
                    <Button 
                        name={item.name}
                        onClick={() => onItemClick && onItemClick(item)}
                    />
                </div>
            ))}
        </div>
    );
});

ItemList.displayName = 'ItemList';

export default ItemList;
