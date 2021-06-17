import { Fragment } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./styles.module.css";
import { createShape } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

export default function Dropdown({ onSelect, children, content }) {
  const illo = useSelector(state => state.illo);
  const dispatch = useDispatch();

  const handleClick = type => {
    if (onSelect) {
      onSelect(type);
    } else {
      const child = createShape(type);
      illo.addChild(child);
      dispatch({ type: "LAYER_ADDED", payload: child });
      dispatch({ type: "SHAPE_SELECTED", payload: child });
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content align="start" className={styles.content}>
        {content.map(item => {
          if (typeof item === "object") {
            return (
              <Fragment key={item}>
                {item.map(type => (
                  <DropdownMenu.Item
                    key={type}
                    className={styles.item}
                    onSelect={() => handleClick(type)}
                  >
                    {type}
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className={styles.separator} />
              </Fragment>
            );
          } else {
            return (
              <DropdownMenu.Item
                key={item}
                className={styles.item}
                onSelect={() => handleClick(item)}
              >
                {item}
              </DropdownMenu.Item>
            );
          }
        })}

        {/* {shapeTypes.map((groupOfTypes, i) => (
          <Fragment key={i}>
            {groupOfTypes.map((type, i) => (
              <DropdownMenu.Item
                key={i}
                className={styles.item}
                onSelect={() => handleClick(type)}
              >
                {type}
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Separator className={styles.separator} />
          </Fragment>
        ))} */}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
