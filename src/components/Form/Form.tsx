import React, { ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import styles from "./Form.module.css";

interface IFormProps {
  codeName?: string;
  iconName?: string;

  onFormChange: (habitData: {
    habit: string;
    habitInformation: string;
    target: number;
  }) => void;

  onDeleteIconClick: () => void;
}

const Form = ({
  codeName = undefined,
  iconName,
  onFormChange,
  onDeleteIconClick,
}: IFormProps): JSX.Element => {
  const [formData, setFormData] = React.useState<{
    habit: string;
    habitInformation: string;
    target: number;
  }>({
    habit: "",
    habitInformation: "",
    target: 0,
  });

  const onFromInputChange = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onTargetInputChange = (e: InputNumberChangeEvent): void => {
    setFormData({ ...formData, target: e.value === null ? 0 : e.value });
  };

  const onDeleteIconButtonClick = () => {
    onDeleteIconClick();
  };

  useEffect(() => {
    onFormChange({ ...formData });
  }, [formData, onFormChange]);

  return (
    <motion.div
      className={styles.root}
      initial={{
        y: -150,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          delay: 0.5,
          duration: 0.5,
        },
      }}
    >
      <div className={styles.inputs}>
        <p className={styles.label}>Habit</p>

        <InputText
          onChange={onFromInputChange}
          value={formData.habit}
          className={styles.input}
          aria-describedby="New habit"
          placeholder="Quit smoking"
          name="habit"
        />
      </div>

      <Divider style={{ margin: "30px 0" }} />

      <div className={styles.inputs}>
        <p className={styles.label}>Habit information</p>
        <InputTextarea
          onChange={onFromInputChange}
          value={formData.habitInformation}
          className={styles.input}
          aria-describedby="Information"
          placeholder="Information"
          name="habitInformation"
          rows={5}
          cols={20}
        />
      </div>

      <Divider style={{ margin: "30px 0" }} />

      <div className={cn(styles.inputs, styles.container)}>
        <div className={styles.target}>
          <p className={styles.label}>Target (in days)</p>
          <InputNumber
            onChange={onTargetInputChange}
            value={formData.target}
            className={styles.input}
            aria-describedby="Habit target"
            placeholder="10"
            name="target"
          />
        </div>

        <Divider layout="vertical" style={{ margin: "0 50px" }} />

        <div className={styles["icon-container"]}>
          <p className={styles.label}>Habit icon</p>

          <AnimatePresence mode="wait">
            {codeName ? (
              <motion.div
                key={codeName}
                className={styles.icon}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                  },
                }}
              >
                <Image
                  src={`/images/habit-icons/${codeName}.png`}
                  width="100%"
                  height="100%"
                  alt={iconName}
                />
              </motion.div>
            ) : (
              <Avatar className={styles.icon} icon="pi pi-image" />
            )}
          </AnimatePresence>

          <Button
            onClick={onDeleteIconButtonClick}
            className={styles.button}
            label="Delete"
            rounded
            text
            icon="pi pi-trash"
            severity="danger"
            disabled={!codeName}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Form;
