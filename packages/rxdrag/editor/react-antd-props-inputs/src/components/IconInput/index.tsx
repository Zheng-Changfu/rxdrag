import { CloseCircleFilled } from "@ant-design/icons";
import { useSettersTranslate } from "@rxdrag/react-core";
import { Badge, Button, Modal } from "antd";
import React, {  useCallback, useEffect, useState } from "react";
import { memo } from "react"
import IconSelectForm, { IconType } from "./IconSelectForm";
import {IIcon, isEmptyIcon, IconView} from "@rxdrag/react-antd-icons"
import "./style.less"


export const IconInput = memo((
  props: {
    value?: IIcon,
    onChange?: (event: { target: { value?: IIcon } }) => void,
  }
) => {
  const { value, onChange } = props;
  const [iconType, setIconType] = useState<IconType>();
  const [inputValue, setInputValue] = useState(value);
  const [visible, setVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>();
  const [customizedIcon, setCustomizedIcon] = useState<string>();
  const t = useSettersTranslate()

  const reset = useCallback(() => {
    setSelectedIcon(value?.iconKey)
    setCustomizedIcon(value?.svgString);
    setInputValue(value);
    setIconType(!value?.iconKey && value?.svgString ? IconType.Customized : IconType.Normal)
  }, [value])

  useEffect(() => {
    reset();
  }, [reset]);

  const handelRemove = useCallback(() => {
    setInputValue(undefined);
    onChange?.({ target: { value: undefined } });
  }, [onChange]);

  const handleShow = useCallback(() => {
    setVisible(true);
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false);
    reset()
  }, [reset])

  const handleConfirm = useCallback(() => {
    let newValue: IIcon | undefined = {
      iconKey: iconType === IconType.Normal ? selectedIcon : undefined,
      svgString: iconType === IconType.Customized ? customizedIcon : undefined,
    }
    newValue = isEmptyIcon(newValue) ? undefined : newValue;
    setInputValue(newValue);
    onChange?.({ target: { value: newValue } });
    setVisible(false);
  }, [customizedIcon, iconType, onChange, selectedIcon])

  return (
    <div
      className="icon-input"
      style={{
        display: "flex",
        alignItems: "center"
      }}>
      <Badge
        count={
          <Button
            style={{
              display: isEmptyIcon(inputValue) ? "none" : undefined
            }}
            icon={<CloseCircleFilled className="icon-remove-button-icon" />}
            type="text"
            size="small"
            onClick={handelRemove}
          />
        }
      >
        <Button
          icon={
            <IconView icon={inputValue} />
          }
          onClick={handleShow}
        />
      </Badge>
      <Modal
        className="icon-select-model"
        title={t("IconInput.DialogTitle")}
        centered
        open={visible}
        okText={t("confirm")}
        cancelText={t("cancel")}
        onOk={handleConfirm}
        onCancel={handleClose}
        width={800}
      >
        <IconSelectForm
          iconType={iconType}
          onTypeChange={setIconType}
          selectedIcon={selectedIcon}
          onSelected={setSelectedIcon}
          customizedIcon={customizedIcon}
          onChangeCustomizedIcon={setCustomizedIcon}
        />
      </Modal>
    </div>
  )
})
