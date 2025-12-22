/** Custom Styles for Cypress Logs
 * @link https://github.com/cypress-io/cypress/issues/2134#issuecomment-1356259978
 * @link https://bobbyhadz.com/blog/javascript-create-style-tag
 * */

const style = document.createElement("style");

style.textContent = `
      li.command.command-name-log > div > span > div > span.command-info {
       background-color:rgb(73, 179, 203) !important;
      }
      li.command.command-name-log > div > span > div > span.command-info > span.command-message > span {
        color:rgb(255, 255, 255) !important;
        font-weight: bold !important;
      }
`;

const getHeadHTML = () => Cypress.$(window.top.document.head);
const headHTML = getHeadHTML();
headHTML.append(style);
