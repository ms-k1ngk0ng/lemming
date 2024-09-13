declare global {

  type Person = {
    id: number,
    name: string,
    pic?: string;
    status?: string;
    groupsIds: number[];
    friendsIds: number[];
  }

  type Group = {
    id: number,
    name: string,
    ownerId: number,
    plans: Plan[]
  }

  type Plan = {
    id: number,
    ownerId: number,
    proposal: string,
    responseOptions: string[],
    responses: Response[]
  }

  type Response = {
    responderId: number,
    responseIndex: number,
    customResponse?: string,
  }
}

export {};