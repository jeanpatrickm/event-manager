import { create } from 'zustand';

// Define o formato de cada passo do tutorial
export interface TutorialStep {
  title: string;
  content: string;
  // Seletor do elemento que queremos destacar (ex: '#search-bar', '.event-card')
  targetSelector: string; 
}

// Define o estado e as ações do nosso store
interface TutorialState {
  isTutorialActive: boolean;
  currentStep: number;
  steps: TutorialStep[];
  startTutorial: (steps: TutorialStep[]) => void;
  endTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const useTutorialStore = create<TutorialState>((set) => ({
  isTutorialActive: false,
  currentStep: 0,
  steps: [],
  
  // Ação para iniciar o tutorial com um conjunto de passos
  startTutorial: (steps) => set({ isTutorialActive: true, currentStep: 0, steps }),

  // Ação para finalizar o tutorial
  endTutorial: () => set({ isTutorialActive: false, currentStep: 0 }),

  // Ação para avançar para o próximo passo
  nextStep: () => set((state) => ({
    currentStep: state.currentStep < state.steps.length - 1 ? state.currentStep + 1 : state.currentStep
  })),

  // Ação para voltar ao passo anterior
  prevStep: () => set((state) => ({
    currentStep: state.currentStep > 0 ? state.currentStep - 1 : 0
  })),
}));