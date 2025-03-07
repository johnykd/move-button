"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import ItemList from "./ItemList";
import { IFruit } from "./types";

interface Props {
  data: IFruit[];
}

const ClickableList = ({ data }: Props) => {
  const [itemClicked, setItemClicked] = useState<IFruit[]>([]);
  const [itemList, setItemList] = useState<IFruit[]>([]);
  const timeoutRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});

  const handleItemClick = useCallback((item: IFruit) => {
    setItemClicked(prev => [...prev, item]);
    setItemList(prev => prev.filter(listItem => listItem.id !== item.id));

    timeoutRefs.current[item.id] = setTimeout(() => {
      setItemList(prev => [...prev, item]);
      setItemClicked(prev => prev.filter(clickedItem => clickedItem.id !== item.id));
      delete timeoutRefs.current[item.id];
    }, 5000);
  }, []);

  const handleReturnItem = useCallback((item: IFruit) => {
    // Clear the timeout if it exists
    if (timeoutRefs.current[item.id]) {
      clearTimeout(timeoutRefs.current[item.id]);
      delete timeoutRefs.current[item.id];
    }
    
    setItemList(prev => [...prev, item]);
    setItemClicked(prev => prev.filter(clickedItem => clickedItem.id !== item.id));
  }, []);

  useEffect(() => {
    setItemList(data);
    return () => {
      // Cleanup timeouts on unmount
      Object.values(timeoutRefs.current).forEach(timeout => clearTimeout(timeout));
    };
  }, [data]);

  return (
    <div className="flex flex-row gap-10 m-2">
      <ItemList
        items={itemList}
        onItemClick={handleItemClick}
        title="Items"
      />
      <ItemList
        items={itemClicked}
        onItemClick={handleReturnItem}
        title="Fruit"
        filter="Fruit"
      />
      <ItemList
        items={itemClicked}
        onItemClick={handleReturnItem}
        title="Vegetable"
        filter="Vegetable"
      />
    </div>
  );
};

export default ClickableList;
