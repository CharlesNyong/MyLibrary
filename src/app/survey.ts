export class Survey {
    private surveySubject: string;
    private surveyText: string;
    private senderEmail: string;
    private surveyOwner: string;

    constructor(surveySubject?: string, surveyText?: string, senderEmail?: string, surveyOwner?: string){
        this.surveySubject = surveySubject;
        this.surveyText = surveyText;
        this.senderEmail = senderEmail;
        this.surveyOwner = surveyOwner;
    }

    public getSurveySubject(): string{
        return this.surveySubject;
    }

    public getSenderEmail(): string{
        return this.senderEmail;
    }

    public getSurveyText(): string{
        return this.surveyText;
    }

    public getSurveyOwner(): string{
        return this.surveyOwner;
    }
}
