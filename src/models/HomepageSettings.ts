import { Schema, model, models } from "mongoose";

export interface HomepageSettings {
  welcome: {
    title: string;
    content: string;
  };
  callToAction: {
    title: string;
    content: string;
    button1: { text: string; link: string; };
    button2: { text: string; link: string; };
  };
}

const homepageSettingsSchema = new Schema<HomepageSettings>({
  welcome: {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
  },
  callToAction: {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    button1: {
      text: { type: String, default: '' },
      link: { type: String, default: '' },
    },
    button2: {
      text: { type: String, default: '' },
      link: { type: String, default: '' },
    },
  },
});

export const HomepageSettingsModel = models.HomepageSettings || model<HomepageSettings>("HomepageSettings", homepageSettingsSchema);
