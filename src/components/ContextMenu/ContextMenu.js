import styles from "./contextMenu.module.css";

export function ContextMenu({ children }) {
  return <div className={`${styles.contextMenu}`}>{children}</div>;
}

export function ContextMenuItem({ children, onClick }) {
  return (
    <button
      className={styles.contextMenuItem}
      onClick={onClick}
      role="menuitem"
      tabIndex="-1"
    >
      {children}
    </button>
  );
}

// <div class="relative inline-block text-left">
//   <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
//     <div class="py-1" role="none">
//       {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
//       <button href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Edit</button>
//       <button href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Duplicate</button>
//     </div>
//     <div class="py-1" role="none">
//       <button href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Archive</button>
//       <button href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Move</button>
//     </div>
//     <div class="py-1" role="none">
//       <button href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Share</button>
//       <button href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-5">Add to favorites</button>
//     </div>
//     <div class="py-1" role="none">
//       <button href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-6">Delete</button>
//     </div>
//   </div>
// </div>
