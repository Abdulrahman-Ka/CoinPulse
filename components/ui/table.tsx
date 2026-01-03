"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a horizontally scrollable table container and a table with base styles.
 *
 * @param className - Additional CSS classes to merge onto the table element
 * @returns A table element wrapped in a responsive container allowing horizontal overflow
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Renders a styled table header (<thead>) that applies a bottom border to its rows and accepts native thead props.
 *
 * @param className - Additional CSS class names to merge with the component's default classes
 * @returns The rendered `<thead>` element
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled `<tbody>` element for table rows.
 *
 * The element includes classes that remove the bottom border on the last row and accepts custom class names and all standard `<tbody>` props.
 *
 * @returns The rendered `<tbody>` element with applied classes and forwarded props.
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled table footer element with a data-slot attribute for layout hooks.
 *
 * @param className - Additional class names to apply to the underlying `<tfoot>` element
 * @param props - Other props are forwarded to the underlying `<tfoot>` element
 * @returns The rendered `<tfoot>` React element
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table row (<tr>) element prewired with consistent table row styling and a data-slot attribute.
 *
 * @returns A `<tr>` element with hover, selected-state, and border styling applied; all received props are forwarded to the element.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a themed table header cell with layout, typography, and checkbox-aware spacing.
 *
 * @param className - Additional CSS classes to merge with the component's default styles
 * @param props - Additional attributes and event handlers forwarded to the underlying `<th>` element
 * @returns A `<th>` element with preset classes and a `data-slot="table-head"` attribute
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table cell with standardized padding, vertical alignment, no-wrap text, and adjusted spacing when a nested checkbox is present.
 *
 * @returns A `td` element with the applied layout classes, a `data-slot="table-cell"` attribute, and any forwarded props.
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table caption element with standardized spacing and muted text styling.
 *
 * @returns A caption element with the `data-slot="table-caption"` attribute and the combined `text-muted-foreground mt-4 text-sm` classes merged with the provided `className`.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}