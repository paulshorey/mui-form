import cssTheme from "./../cssTheme";
import styled from "styled-components";

export const Button = styled.button`
  /*
    reset, ???
*/
  position: relative;
  font-size: 1.33rem;
  line-height: 1rem;
  padding: 0.6rem;
  outline-width: 0;
  border: none;
  outline: none;
  text-overflow: ellipsis;
  font-family: ${cssTheme.fontFamily};
  border-radius: 0;
  &:focus {
    outline: none;
    outline-width: none;
  }
  > * {
    font-size: 1.25rem;
    line-height: 1rem;
  }

  /*
    & in parent
*/
  .right & {
    margin-right: 0.1rem;
    margin-left: 0.5rem;
  }
  .formSubmit & {
    vertical-align: middle;
  }
  .submitting & {
    &:not(.clear) {
      // style the disabled "submitting" buttons here
    }
  }

  /*
    styled
*/
  display: inline-block;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 0 1px #ffffff;
  padding: 0;
  color: #fff;
  font-weight: 500;
  margin: 0.6rem 1rem 1rem 0;
  border-radius: 2px;
  background: ${cssTheme.colorNeutral};
  > * {
    border-radius: 2px;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.15);
    display: block;
    padding: 0.6rem 1.15rem 0.45rem 1.25rem;
    font-size: 1em;
    line-height: 1.5em;
    > * {
      vertical-align: baseline;
      display: inline-block;
    }
    .fontIcon {
      margin: -0.1rem 0 -0.2rem -0.25rem;
      overflow: hidden;
      font-size: inherit;
      &:before {
        font-size: inherit;
      }
    }
    .fontIcon + span {
      margin-top: -0.66rem;
    }
  }

  /*
    variations
*/
  &.small {
    > * {
      font-size: 1rem;
      line-height: 1rem;
    }
  }
  &.circle {
    border-radius: 50% !important;
    width: auto !important;
    padding: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    line-height: 0.5rem;
    > * {
      border-radius: 50% !important;
      padding: 1rem !important;
      margin: 0 !important;
      > .fontIcon {
        margin: -0.33rem -0.25rem -0.15rem -0.15rem !important;
      }
    }
    &.small {
      > * {
        padding: 0.8rem 0.8rem 0.75rem 0.75rem !important;
        line-height: 1rem;
      }
    }
  }
  &.primary {
    background: ${cssTheme.colorGreen1};
    color: #ffffff;
  }
  &.error {
    background: ${cssTheme.colorWarn2};
    color: ${cssTheme.colorOnDark1};
  }
  &.warn {
    background: ${cssTheme.colorOrange2};
    color: ${cssTheme.colorOnDark1};
  }
  &.delete {
    background: ${cssTheme.colorWarn3};
    color: ${cssTheme.colorOnDark1};
  }
  &.small {
    font-size: 80%;
  }
  &.clear,
  &.transparent {
    background: transparent;
    border: none;
    box-shadow: 0 0 0 1px transparent;
    text-shadow: #fff;
    color: ${cssTheme.colorOnLight2};
    > * {
      background: rgba(255, 255, 255, 0);
      border: none;
      box-shadow: none;
    }
    &.na {
      color: ${cssTheme.colorGreen1};
    }
    &.success {
      color: ${cssTheme.colorGreen1};
      font-weight: bold;
      * {
        font-weight: bold;
      }
    }
    &.error {
      color: ${cssTheme.colorWarn1};
      font-weight: bold;
      * {
        font-weight: bold;
      }
    }
    &.invalid {
      color: ${cssTheme.colorWarn1};
    }
    * {
      font-weight: normal;
    }
  }
  &[disabled] {
    background: ${cssTheme.colorOnLight3};
    &.loading {
      overflow: hidden;
      &:after {
        // opacity:1;
        // content: ' ';
        // position:absolute;
        // top:0;
        // left:100%;
        // width:1000%;
        // height:100%;

        // background: linear-gradient(115deg, rgba(255,255,255, 0), rgba(255,255,255,0.66), rgba(255,255,255, 0));
        // background-size: 100% 100%;
        // background-position: center;
        // -webkit-animation: mmLoadingRight 3s linear infinite;
        // -moz-animation: mmLoadingRight 3s linear infinite;
        // animation: mmLoadingRight 3s linear infinite;
      }
    }
  }
  &.inline {
    margin-top: 0.1rem;
    margin-bottom: 0.3rem;
  }

  /*
    hover effect
*/

  /* fancy new way */
  // @keyframes buttonHoverOpacity {
  //     0%{opacity:1;}
  //     3%{opacity:0.6;}
  //     5%{opacity:0.7.5;}
  //     9%{opacity:0.9;}
  //     90%{opacity:1;}
  // }
  // &:hover {
  //     animation: buttonHoverOpacity 10s linear infinite;
  // }
  /* fancy original way */
  position: relative;
  overflow: hidden;
  &:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: #fff;
    /* transition: opacity 0.25s ease-out; */
    pointer-events: none;
  }
  &:hover {
    &:after {
      opacity: 0.25;
    }
  }
`;
