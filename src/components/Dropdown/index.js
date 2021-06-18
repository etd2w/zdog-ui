import { Fragment } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./styles.module.css";

export default function Dropdown({ onSelect, children, content }) {
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
                    onSelect={() => onSelect(type)}
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
                onSelect={() => onSelect(item)}
              >
                {item}
              </DropdownMenu.Item>
            );
          }
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
