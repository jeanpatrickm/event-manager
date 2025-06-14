import React, { useState, useLayoutEffect } from 'react';
import { useTutorialStore } from '../../stores/tutorialStore';
import * as S from './styles';

const Tutorial: React.FC = () => {
  const { 
    isTutorialActive, 
    currentStep, 
    steps, 
    endTutorial, 
    nextStep, 
    prevStep 
  } = useTutorialStore();

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const step = steps[currentStep];

  // Atualiza as dimensões da janela quando ela é redimensionada
  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Este efeito observa a tela e atualiza a posição do destaque
  // se a janela for redimensionada ou rolada
  useLayoutEffect(() => {
    if (!isTutorialActive || !step?.targetSelector) {
      return;
    }

    const updatePosition = () => {
      const element = document.querySelector(step.targetSelector);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
      }
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    const scrollContainer = document.querySelector('.main-content');
    scrollContainer?.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      scrollContainer?.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, isTutorialActive, step?.targetSelector]);

  if (!isTutorialActive || !step || !targetRect) {
    return null;
  }

  // Calcula a posição do popup com verificação de limites
  const calculatePopupPosition = () => {
    const popupWidth = 300; // Largura fixa do popup
    const popupHeight = 200; // Altura estimada do popup
    const margin = 10; // Margem de segurança
    
    let top = targetRect.bottom + margin;
    let left = targetRect.left;
    
    // Verifica se o popup vai ultrapassar a parte inferior da janela
    if (top + popupHeight > windowSize.height) {
      // Coloca acima do elemento alvo se não couber abaixo
      top = targetRect.top - popupHeight - margin;
      // Garante que não fique acima da janela
      if (top < 0) top = margin;
    }
    
    // Verifica se o popup vai ultrapassar a parte direita da janela
    if (left + popupWidth > windowSize.width) {
      left = windowSize.width - popupWidth - margin;
      // Garante que não fique antes da janela
      if (left < 0) left = margin;
    }
    
    // Garante que não fique antes da esquerda da janela
    if (left < 0) left = margin;
    
    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  const popupStyle = calculatePopupPosition();

  return (
    <>
      <S.HighlightedElement style={{
        top: `${targetRect.top - 4}px`,
        left: `${targetRect.left - 4}px`,
        width: `${targetRect.width + 8}px`,
        height: `${targetRect.height + 8}px`,
      }} />

      <S.TutorialPopupBox style={popupStyle}>
        <h3>{step.title}</h3>
        <p>{step.content}</p>
        <S.TutorialControls>
          <S.CloseButton onClick={endTutorial}>Fechar</S.CloseButton>
          <S.StepCounter>{currentStep + 1} / {steps.length}</S.StepCounter>
          <div>
            <S.Button onClick={prevStep} disabled={currentStep === 0} style={{marginRight: '8px'}}>Anterior</S.Button>
            <S.Button onClick={currentStep === steps.length - 1 ? endTutorial : nextStep}>
              {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </S.Button>
          </div>
        </S.TutorialControls>
      </S.TutorialPopupBox>
    </>
  );
};

export default Tutorial;