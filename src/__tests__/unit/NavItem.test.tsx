import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavItem } from '@/components/layout/NavItem'
import { ViewState } from '@/types'
import { Home } from 'lucide-react'

describe('NavItem Component', () => {
    const mockOnNavigate = vi.fn()

    const defaultProps = {
        view: ViewState.DASHBOARD_HOME,
        icon: Home,
        label: 'Dashboard',
        currentView: ViewState.DASHBOARD_HOME,
        onNavigate: mockOnNavigate
    }

    it('should render the navigation item with label', () => {
        render(<NavItem {...defaultProps} />)

        expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    it('should render the icon component', () => {
        render(<NavItem {...defaultProps} />)

        // Icon should be rendered (lucide-react icons have aria-hidden="true")
        const button = screen.getByRole('button', { name: /navigate to dashboard/i })
        expect(button).toBeInTheDocument()
    })

    it('should apply active styles when currentView matches view', () => {
        render(<NavItem {...defaultProps} />)

        const button = screen.getByRole('button')
        expect(button).toHaveClass('bg-brand/10', 'text-brand')
        expect(button).toHaveAttribute('aria-current', 'page')
    })

    it('should not apply active styles when currentView does not match view', () => {
        render(
            <NavItem
                {...defaultProps}
                currentView={ViewState.DASHBOARD_SETTINGS}
            />
        )

        const button = screen.getByRole('button')
        expect(button).not.toHaveClass('bg-brand/10')
        expect(button).not.toHaveAttribute('aria-current')
    })

    it('should call onNavigate with correct view when clicked', async () => {
        const user = userEvent.setup()
        render(<NavItem {...defaultProps} />)

        const button = screen.getByRole('button')
        await user.click(button)

        expect(mockOnNavigate).toHaveBeenCalledTimes(1)
        expect(mockOnNavigate).toHaveBeenCalledWith(ViewState.DASHBOARD_HOME)
    })

    it('should have proper accessibility attributes', () => {
        render(<NavItem {...defaultProps} />)

        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label', 'Navigate to Dashboard')
        expect(button).toHaveAttribute('aria-current', 'page')
    })

    it('should render active indicator when active', () => {
        const { container } = render(<NavItem {...defaultProps} />)

        // Active indicator is a div with specific classes
        const indicator = container.querySelector('.absolute.left-0.top-0.bottom-0.w-1.bg-brand')
        expect(indicator).toBeInTheDocument()
    })

    it('should not render active indicator when inactive', () => {
        const { container } = render(
            <NavItem
                {...defaultProps}
                currentView={ViewState.DASHBOARD_SETTINGS}
            />
        )

        const indicator = container.querySelector('.absolute.left-0.top-0.bottom-0.w-1.bg-brand')
        expect(indicator).not.toBeInTheDocument()
    })

    it('should apply bold font when active', () => {
        render(<NavItem {...defaultProps} />)

        const label = screen.getByText('Dashboard')
        expect(label).toHaveClass('font-bold')
    })

    it('should not apply bold font when inactive', () => {
        render(
            <NavItem
                {...defaultProps}
                currentView={ViewState.DASHBOARD_SETTINGS}
            />
        )

        const label = screen.getByText('Dashboard')
        expect(label).not.toHaveClass('font-bold')
    })

    it('should handle different view states correctly', async () => {
        const user = userEvent.setup()
        const onNavigate = vi.fn()

        const { rerender } = render(
            <NavItem
                view={ViewState.DASHBOARD_ARCO}
                icon={Home}
                label="ARCO"
                currentView={ViewState.DASHBOARD_HOME}
                onNavigate={onNavigate}
            />
        )

        const button = screen.getByRole('button')
        await user.click(button)

        expect(onNavigate).toHaveBeenCalledWith(ViewState.DASHBOARD_ARCO)

        // Rerender with new currentView
        rerender(
            <NavItem
                view={ViewState.DASHBOARD_ARCO}
                icon={Home}
                label="ARCO"
                currentView={ViewState.DASHBOARD_ARCO}
                onNavigate={onNavigate}
            />
        )

        expect(button).toHaveClass('bg-brand/10')
    })
})
