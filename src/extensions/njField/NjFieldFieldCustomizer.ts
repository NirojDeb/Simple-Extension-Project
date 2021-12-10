import * as React from "react";
import * as ReactDOM from "react-dom";

import { Log } from "@microsoft/sp-core-library";
import { override } from "@microsoft/decorators";
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters,
} from "@microsoft/sp-listview-extensibility";

import * as strings from "NjFieldFieldCustomizerStrings";
import NjField, { INjFieldProps } from "./components/NjField";
import styles from "./NjFieldFieldCustomizer.module.scss";
/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface INjFieldFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = "NjFieldFieldCustomizer";

export default class NjFieldFieldCustomizer extends BaseFieldCustomizer<INjFieldFieldCustomizerProperties> {
  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, "Activated NjFieldFieldCustomizer with properties:");
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(
      LOG_SOURCE,
      `The following string should be equal: "NjFieldFieldCustomizer" and "${strings.Title}"`
    );
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    event.domElement.classList.add(styles.cell);
    event.domElement.innerHTML = `
    <div class='${styles.HelloWorld}'>
        <div class='${styles.full}'>
        <div style='width: ${event.fieldValue}px; background:#0094ff; color:#c0c0c0'>
            &nbsp; ${event.fieldValue}
        </div>
        </div>
    </div>`;
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
