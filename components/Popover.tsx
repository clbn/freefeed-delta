import * as React from 'react';
import {
  useFloating, autoUpdate,
  offset, shift, flip, arrow,
  useClick, useDismiss, useRole, useInteractions, useMergeRefs,
  FloatingPortal, FloatingFocusManager, FloatingArrow
} from '@floating-ui/react';

interface PopoverOptions {
  initialOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function usePopover({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const arrowRef = React.useRef(null);
  const ARROW_HEIGHT = 7;
  const GAP = 2;

  const data = useFloating({
    placement: 'bottom-start',
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: ARROW_HEIGHT + GAP, alignmentAxis: -10 }),
      shift({ padding: 10 }),
      flip(),
      arrow({ element: arrowRef }),
    ]
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen === null
  });
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown'
  });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      ...interactions,
      ...data,
    }),
    [open, setOpen, arrowRef, interactions, data]
  );
}

const PopoverContext = React.createContext<ReturnType<typeof usePopover> | null>(null);

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (context === null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }
  return context;
};

export function Popover({
  children,
  ...restOptions
}: { children: React.ReactNode } & PopoverOptions) {
  const popover = usePopover(restOptions);
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
}

export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement>
>(function PopoverTrigger({ children, ...props }, propRef) {
  const context = usePopoverContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (!React.isValidElement(children)) {
    throw new Error('Popover child is not a valid element');
  }

  return React.cloneElement(
    children,
    context.getReferenceProps({
      ref,
      ...props,
      ...children.props,
      'data-state': context.open ? 'open' : 'closed'
    })
  );
});

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function PopoverContent(props, propRef) {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  return (
    context.open && (
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext} modal={false}>
          <div
            ref={ref}
            style={{
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
              width: 'max-content',
              outline: 0,
              ...props.style
            }}
            data-placement={context.placement}
            {...context.getFloatingProps(props)}
          >
            <FloatingArrow ref={context.arrowRef} context={floatingContext}/>
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    )
  );
});
