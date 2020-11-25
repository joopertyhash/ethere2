import React, { useState, createRef } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import { motion } from "framer-motion"

import Icon from "./Icon"
import Link from "./Link"
import Translation from "./Translation"
import { ButtonSecondary } from "./SharedStyledComponents"
import { useOnClickOutside } from "../hooks/useOnClickOutside"

const Container = styled.div`
  position: relative;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
`

const DropdownList = styled(motion.ul)`
  min-width: 240px;
  z-index: 2;
  margin: 0;
  margin-top: 0.25rem;
  position: absolute;
  list-style-type: none;
  list-style-image: none;
  top: 100%;
  width: auto;
  border-radius: 0.5em;
  background: ${(props) => props.theme.colors.dropdownBackground};
  border: 1px solid ${(props) => props.theme.colors.text};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    text-align: center;
  }
`

const listVariants = {
  open: {
    opacity: 1,
    rotateX: 0,
    display: "block",
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    rotateX: -15,
    transitionEnd: {
      display: "none",
    },
  },
}

const Button = styled(ButtonSecondary)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 240px;
  margin-top: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 1rem;
  }
`

const DropdownItem = styled.li`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.dropdownBackgroundHover};
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const ButtonDropdown = ({ list, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()
  const ref = createRef()

  useOnClickOutside(ref, () => setIsOpen(false))

  // Toggle on `enter` key
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <Container
      className={className}
      ref={ref}
      aria-label={`Select ${intl.formatMessage({
        id: list.text,
      })}`}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={onKeyDownHandler}
        tabIndex="0"
      >
        <StyledIcon name="menu" />
        <Translation id={list.text} />
      </Button>
      <DropdownList
        animate={isOpen ? "open" : "closed"}
        variants={listVariants}
        initial="closed"
      >
        {list.items.map((item, idx) => {
          return (
            <DropdownItem key={idx} onClick={() => setIsOpen(false)}>
              <NavLink to={item.to} tabIndex="-1">
                <Translation id={item.text} />
              </NavLink>
            </DropdownItem>
          )
        })}
      </DropdownList>
    </Container>
  )
}

export default ButtonDropdown
