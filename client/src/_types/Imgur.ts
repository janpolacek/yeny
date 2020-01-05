export interface ImgurResponse {
    data: {
        id: string;
        title: string | null;
        description: string | null;
        datetime: Date;
        type: string;
        animated: boolean;
        width: number;
        height: number;
        size: number;
        views: number;
        bandwidth: number;
        vote: any;
        favorite: any;
        nsfw: boolean;
        section: any;
        account_url: any;
        account_id: any;
        is_ad: boolean;
        in_most_viral: boolean;
        has_sound: boolean;
        tags: [];
        ad_type: number;
        ad_url: string;
        edited: string;
        in_gallery: string;
        deletehash: string;
        name: string;
        link: string;
    };
    success: boolean;
    status: number;
}
