import { CaretLeft, CaretRight } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Container } from './styles';

interface DropdownProps {
  subtitle: Array<{ name: string, link?: any }>;
  //href: [{ link?: any }];
}

const Dropdown: React.FC<DropdownProps> = ({ subtitle }) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState<string | number>('10rem');
  const dropdownRef = useRef(null) as any;

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el: any) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  return (
    <Container ref={dropdownRef} style={{ height: menuHeight }}>
      <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
        <div className="menu">
          {subtitle.map((sb, key) => (
            sb.link ?
              <Link to={sb.link} key={key.toString()}>{sb.name}</Link>
              : <button key={key.toString()} className='expand' onClick={() => setActiveMenu(sb.name)}>{sb.name}<CaretRight size={18} /> </button>
          ))}
        </div>
      </CSSTransition>
      <CSSTransition in={activeMenu === 'Acompanhamentos'} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
        <div className="menu">
          <button onClick={() => setActiveMenu('main')}><CaretLeft size={18} />Voltar</button>
          <Link to="/programm" key={0}>Programação</Link>
        </div>
      </CSSTransition>
      <CSSTransition in={activeMenu === 'Secções'} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
        <div className="menu">
          <button onClick={() => setActiveMenu('main')}><CaretLeft size={18} />Voltar</button>
          <Link key={1} to="/list-section-one">1º Secção</Link>
          <Link key={2} to="/list-section-two">2º Secção</Link>
          <Link key={3} to="/list-section-three">3º Secção</Link>
          <Link key={4} to="/list-section-four">4º Secção</Link>
          <Link key={5} to="/list-section-five">5º Secção</Link>
        </div>
      </CSSTransition>
    </Container>
  )
}

export default Dropdown;
