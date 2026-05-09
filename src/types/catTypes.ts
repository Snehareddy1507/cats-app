export type Cat = {
    id: string;
    url: string;
    width: number;
    height: number;
};

export type Favourite = {
    id: number;
    image_id: string;
};

export type Vote = {
    id: number;
    image_id: string;
    value: number;
};

export type UploadResponse = {
    id: string;
    url: string;
    width: number;
    height: number;
};

export type AddFavouriteResponse = {
    message: string;
    id: number;
};

export type AddFavouriteRequest = {
    image_id: string;
};

export type AddVoteRequest = {
    image_id: string;
    value: number;
};

export type AddVoteResponse = {
    message: string;
    id: number;
};