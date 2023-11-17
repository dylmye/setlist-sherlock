import { Platform } from "react-native";

import { Venue } from "../store/services/setlistFm";

export const getMapsAddressFromVenue = (venue: Venue): string => {
    const searchQuery = `${venue?.name}, ${venue?.city?.name}, ${venue?.city?.country?.name}`;

    if (Platform.OS === "ios") {
        return `maps:0,0?q=${searchQuery}`;
    }
    return `geo:0,0?q=${searchQuery}`;
};
