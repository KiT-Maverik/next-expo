## Component structure
* Providers. Configuration layer, intended to group all kinds of Functional providers.
  * Layout. Root-level page layout.
    * Page. High-level component, intended to unify page functional, like: title, meta control, layout, etc.
      * Button. Button to call modals
      * Modal. Reusable generic component, intended serve as a single source of truth for modal logic, style, and behavior.
        * Header. Modal section intended to handle header layout.
        * Body. Modal subcomponent. Contains one of our forms
        * Actions. Modal sub-component, provides unified layout for modal action buttons.
