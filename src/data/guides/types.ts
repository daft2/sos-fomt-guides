export type GuideCategory = 'tips' | 'farming' | 'animals' | 'mining' | 'fishing' | 'stamina';

export interface BilingualText {
  id: string;
  en: string;
}

export interface GuideSection {
  heading: BilingualText;
  body: BilingualText;
}

export interface Guide {
  id: string;
  title: BilingualText;
  category: GuideCategory;
  sections: GuideSection[];
}
