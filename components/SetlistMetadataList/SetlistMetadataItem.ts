type SetlistMetadataItem = {
    /** flatlist reference */
    key: string;
    /** human friendly name e.g. Artist */
    title: string;
    /** human friendly value e.g. Piri */
    value: string;
    /** optional, in-app link for more info */
    internalLink?: string;
    /** optional, outside link for more info */
    externalLink?: string;
    /** optional, left accessory icon name */
    iconName?: string;
};

export default SetlistMetadataItem;
