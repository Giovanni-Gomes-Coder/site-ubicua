import styled from 'styled-components'
import { FaCloud } from 'react-icons/fa';

import sectionOne from '/assets/backgrounds/background.svg';

export const Container = styled.div`
  --padding-top: 6.25rem;
  --padding-bottom: 8rem;
  --heading-font-size: 32px;
  --content-width: 100%;

  &.blue {
    --bg-color: var(--color-tertiary);
    --text-color: var(--color-secondary); /*var(--color-quaternary)*/
    --logo-color: var(--color-black);    
    --icon-color: var(--color-secondary);    
  }
  &.beige {
    --bg-color: var(--color-secondary);
    --text-color: var(--color-quaternary);
    --logo-color: var(--color-primary);
    --icon-color: var(--color-quaternary);  
  }
  &.white {
    --bg-color: var(--color-primary);
    --text-color: var(--color-quaternary);
    --logo-color: var(--color-secondary);
    --icon-color: var(--color-quaternary);  
  }
  &.black {
    --bg-color: var(--color-quaternary);
    --text-color: var(--color-tertiary);
    --logo-color: var(--color-black);
    --icon-color: var(--color-tertiary);  
  }

  &:first-child {
    --padding-top: 6rem;
    --heading-font-size: 41px;
    --padding-bottom: 6rem;

    flex: 1;
    background: url(${sectionOne}) no-repeat center;
    background-size: cover;
    text-align: center;
    p {
      text-align: justify;
      color: var(--color-quaternary);
    }
    
    /* font-style: normal;
    font-weight: 800;
    font-size: 72px;
    line-height: 98px; */
    
    @media (min-width: 1024px) {
      --content-width: 50%;
      --heading-font-size: 71px;
    }
  }

  background: var(--bg-color);
  position: relative;

  :nth-child(6n) {    
    
    h2 {
      max-width: 100%;
      text-align: center;
      font-style: normal;
      font-weight: 800;
      font-size: 48px;
      line-height: 64px;
      /* or 133% */
      font-feature-settings: 'liga' off;
      color: var(--logo-color); /*#18191F*/
      /* Inside auto layout */
      flex: none;
      order: 0;
      flex-grow: 0;
    }
    /* padding-bottom: 30rem; */
    padding: 4rem 0rem 35rem 0rem;
    background-color: var(--color-tertiary);    
    
  }
`;

export const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  clip: rect(auto, auto, auto, auto);
`;

export const Header = styled.header`
  z-index: 5;
  background: var(--bg-color);

  display: flex;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 32px;

  > h1 {
    display: flex;
    align-items: center;
    min-width: 30rem;

    > span{
      color: var(--text-color);
      margin-left: 10px;
      font-size: 1.8rem;
    }
  }
  
  > div.button {
    display: flex;
    gap: 1rem;

    > :nth-child(1) {
      font-weight: bold;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      background: var(--logo-color);
      color: var(--bg-color);
      border: 1px solid var(--logo-color);
      text-decoration: none;
      width: 80px;
      &:focus {
        box-shadow: inset 0 0 0 calc(3px + 0px) var(--logo-color);
        outline: 2px solid transparent;
        outline-offset: 2px;
      }
      &:hover {
        color: var(--logo-color);
        border: 1px solid var(--logo-color);
        background-color: var(--bg-color);
      }

      transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }
    > :nth-child(2) {
      font-weight: bold;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      background: transparent;
      color: var(--logo-color);
      border: 1px solid var(--logo-color);
      text-decoration: none;
      width: 115.2px;

      &:focus {
        box-shadow: inset 0 0 0 calc(3px + 0px) var(--logo-color);
        outline: 2px solid transparent;
        outline-offset: 2px;
      }
      &:hover {
        color: var(--bg-color);
        border: 1px solid var(--bg-color);
        background-color: var(--logo-color);
      }

      transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }
  }

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const UbicuaLogo = styled(FaCloud)`
  width: 2rem;
  height: 2rem;
  fill: var(--logo-color);
`;

export const MenuNav = styled.div`
  display: flex;
  gap: 3rem;
  font-weight: 500;
  /* margin-left: 2rem; */
  padding-right: 3rem;
  width: 100%;
  justify-content: end;
`;

export const Content = styled.div`
  z-index: 2;
  position: relative;
  max-width: auto;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > header h2 {
    font-size: var(--heading-font-size);
    color: var(--logo-color);
    max-width: 50rem;
  }
  > header p {
    margin: 20px 0;
    font-size: 16px;
    color: var(--text-color);
    max-width: 95%;
  }
  padding: var(--padding-top) 32px var(--padding-bottom);
`;

export const Background = styled.div`
  flex: 1;
  background: url(${sectionOne}) no-repeat center;
  background-size: cover;
`;