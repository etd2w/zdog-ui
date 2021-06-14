import * as ContMenu from "@radix-ui/react-context-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./styles.module.css";

export default function LayerContextMenu({ handlers, children, moveToList }) {
  const {
    handleRemove,
    toggleHidden,
    handleDuplicate,
    handleGroup,
    handleMove,
  } = handlers;

  return (
    <ContMenu.Root>
      <ContMenu.Trigger>{children}</ContMenu.Trigger>
      <ContMenu.Content className={styles.content}>
        <ContMenu.Item onSelect={handleDuplicate} className={styles.item}>
          Dublicate
        </ContMenu.Item>
        <ContMenu.Item onSelect={toggleHidden} className={styles.item}>
          Toggle Hidden
        </ContMenu.Item>
        <ContMenu.Separator className={styles.separator} />
        <ContMenu.Item disabled className={styles.item}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>Move to</DropdownMenu.Trigger>
            <DropdownMenu.Content side="right" className={styles.content}>
              {moveToList.map(item => (
                <DropdownMenu.Item
                  onSelect={() => handleMove(item)}
                  className={styles.item}
                  key={item.id ? item.id : item.canvasId}
                >
                  {item.name ? item.name : "illo"}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </ContMenu.Item>
        <ContMenu.Item onSelect={handleGroup} className={styles.item}>
          Group
        </ContMenu.Item>
        <ContMenu.Separator className={styles.separator} />
        <ContMenu.Item onSelect={handleRemove} className={styles.item}>
          Delete
        </ContMenu.Item>
      </ContMenu.Content>
    </ContMenu.Root>
  );
}
