import { browser, by, element, ElementFinder } from 'protractor';
export class ConversionPage {
 navigateTo(): Promise<unknown> {
 return browser.get(browser.baseUrl+"/ngr-conversion") as Promise<unknown>;
 }
 getInputMontantElement(): ElementFinder {
 return element(by.css("app-root app-conversion input[name='montant']")) ;
 }
 getButtonConvertirElement(): ElementFinder {
 return element(by.css("app-root app-conversion input[type='button']")) ;
 }
 getMontantConvertiText(): Promise<string> {
 return element(by.id("montantConverti")).getText() as Promise<string> ;
 }
 getSelectCodeDevSourceOptionElementContaining(val : string): ElementFinder {
 return element(by.cssContainingText(
 "app-root app-conversion select[name='codeDevSource'] option",val)) ;
 }
 getSelectCodeDevCibleOptionElementContaining(val : string): ElementFinder {
 return element(by.cssContainingText(
 "app-root app-conversion select[name='codeDevCible'] option",val)) ;
 }
}
