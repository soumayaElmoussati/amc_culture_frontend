class ParticipantsInformation {
    lastName: string;
    firstName: string;
    cin: string;
    role1: string;
    role2: string;
    role3: string;
    personalityName: string;
    theaterPiece: string;

    setObject(arr: any) {
        for (let i of Object.keys(arr))
            this[i] = arr[i];
    }
}
export default ParticipantsInformation;