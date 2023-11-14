import { Tabs as Root } from './Tabs';
import { TabsList } from './TabsList';
import { TabsPanel } from './TabsPanel';
import { TabsItem } from './TabsItem';

export type { TabsProps } from './Tabs';
export type { TabsItemProps } from './TabsItem';

export const Tabs = Object.assign(Root, {
    Tabs: Root,
    List: TabsList,
    Item: TabsItem,
    Panel: TabsPanel,
});