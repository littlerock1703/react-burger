
import { NavLink, useMatch } from 'react-router-dom'
import React from 'react'
import style from './nav-link-custom.module.scss'

interface NavLinkCustomProps {
  link: string
  text: string
  icon: React.JSX.Element
}

export const NavLinkCustom = ({ link, text, icon }: NavLinkCustomProps): React.JSX.Element => {
  const isRouteMatch = useMatch(link + '/*')

  return (
    <NavLink to={link} className={`${style.link} ${isRouteMatch && style.active}`}>
      {React.cloneElement(icon, { type: isRouteMatch ? 'primary' : 'secondary' })}
      <span>{text}</span>
    </NavLink>
  )
}