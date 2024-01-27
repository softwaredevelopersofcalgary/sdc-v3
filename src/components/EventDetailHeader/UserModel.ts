export interface UserModel {
    id: string;
    isAttending?: boolean;
    role?: string;
}


// - we want to be able to use this model to check if someone is attending an event 