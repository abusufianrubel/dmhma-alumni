import { Form } from '@inertiajs/react';
import {
    Check,
    ChevronsUpDown,
    GraduationCap,
    LoaderCircle,
    Search,
    ShieldCheck,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store as storeBatch } from '@/routes/profile/batch';

type BatchSelectionModalProps = {
    batchYears: number[];
};

export default function BatchSelectionModal({
    batchYears,
}: BatchSelectionModalProps) {
    const [query, setQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [isListOpen, setIsListOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const comboboxRef = useRef<HTMLDivElement>(null);

    const filteredYears = useMemo(() => {
        const normalizedQuery = query.trim();

        return normalizedQuery === ''
            ? batchYears
            : batchYears.filter((year) =>
                  String(year).includes(normalizedQuery),
              );
    }, [batchYears, query]);

    useEffect(() => {
        const closeList = (event: MouseEvent) => {
            if (!comboboxRef.current?.contains(event.target as Node)) {
                setIsListOpen(false);
            }
        };

        document.addEventListener('mousedown', closeList);

        return () => document.removeEventListener('mousedown', closeList);
    }, []);

    const chooseYear = (year: number) => {
        setSelectedYear(year);
        setQuery(String(year));
        setIsListOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            setIsListOpen(false);

            return;
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setIsListOpen(true);
            setActiveIndex((current) => {
                const direction = event.key === 'ArrowDown' ? 1 : -1;
                const nextIndex = current + direction;

                return Math.max(
                    0,
                    Math.min(filteredYears.length - 1, nextIndex),
                );
            });

            return;
        }

        if (event.key === 'Enter' && isListOpen && filteredYears[activeIndex]) {
            event.preventDefault();
            chooseYear(filteredYears[activeIndex]);
        }
    };

    return (
        <Dialog open onOpenChange={() => undefined}>
            <DialogContent
                showCloseButton={false}
                onEscapeKeyDown={(event) => event.preventDefault()}
                onPointerDownOutside={(event) => event.preventDefault()}
                onInteractOutside={(event) => event.preventDefault()}
                className="max-h-[calc(100dvh-2rem)] [scrollbar-width:none] gap-0 overflow-y-auto overscroll-contain border-brand-primary/30 bg-card p-0 shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:max-w-[32rem] [&::-webkit-scrollbar]:hidden"
            >
                <div className="relative overflow-hidden border-b border-sky-600/20 bg-[linear-gradient(145deg,#0ea5e9,#38bdf8)] px-6 py-7 text-center text-slate-950 sm:px-8 sm:py-8">
                    <div className="pointer-events-none absolute -top-16 -right-12 size-44 rounded-full border-[28px] border-slate-950/8" />
                    <span className="relative mx-auto grid size-14 place-items-center rounded-2xl border border-slate-950/15 bg-white/20 shadow-lg backdrop-blur-sm">
                        <GraduationCap className="size-7" aria-hidden="true" />
                    </span>
                    <DialogHeader className="relative mt-5 text-center sm:text-center">
                        <DialogTitle className="text-2xl leading-tight font-bold tracking-tight text-slate-950">
                            Complete Your Alumni Profile
                        </DialogTitle>
                        <DialogDescription className="mx-auto max-w-sm text-sm leading-6 text-slate-800">
                            One final step to unlock your personalized member
                            experience.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <Form
                    {...storeBatch.form()}
                    className="px-6 py-6 sm:px-8 sm:py-7"
                >
                    {({ errors, processing }) => (
                        <>
                            <input
                                type="hidden"
                                name="batch_year"
                                value={selectedYear ?? ''}
                            />

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="batch-year-search"
                                    className="text-sm font-bold text-foreground"
                                >
                                    Select Your SSC Batch
                                </Label>

                                <div ref={comboboxRef} className="relative">
                                    <div className="relative">
                                        <Search
                                            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                                            aria-hidden="true"
                                        />
                                        <Input
                                            id="batch-year-search"
                                            type="text"
                                            role="combobox"
                                            inputMode="numeric"
                                            autoComplete="off"
                                            autoFocus
                                            aria-expanded={isListOpen}
                                            aria-controls="batch-year-options"
                                            aria-autocomplete="list"
                                            aria-activedescendant={
                                                isListOpen &&
                                                filteredYears[activeIndex]
                                                    ? `batch-year-${filteredYears[activeIndex]}`
                                                    : undefined
                                            }
                                            aria-invalid={Boolean(
                                                errors.batch_year,
                                            )}
                                            value={query}
                                            placeholder="Search or select batch..."
                                            onFocus={() => setIsListOpen(true)}
                                            onChange={(event) => {
                                                setQuery(event.target.value);
                                                setSelectedYear(null);
                                                setActiveIndex(0);
                                                setIsListOpen(true);
                                            }}
                                            onKeyDown={handleKeyDown}
                                            className="h-12 rounded-xl border-brand-border bg-background pr-11 pl-10 text-base shadow-sm focus-visible:border-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/15"
                                        />
                                        <ChevronsUpDown
                                            className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    {isListOpen && (
                                        <div
                                            id="batch-year-options"
                                            role="listbox"
                                            aria-label="SSC batch years"
                                            className="absolute z-60 mt-2 max-h-52 w-full overflow-y-auto rounded-xl border border-brand-border bg-popover p-1.5 text-popover-foreground shadow-xl"
                                        >
                                            {filteredYears.length > 0 ? (
                                                filteredYears.map(
                                                    (year, index) => (
                                                        <button
                                                            key={year}
                                                            id={`batch-year-${year}`}
                                                            type="button"
                                                            role="option"
                                                            aria-selected={
                                                                selectedYear ===
                                                                year
                                                            }
                                                            onMouseDown={(
                                                                event,
                                                            ) =>
                                                                event.preventDefault()
                                                            }
                                                            onMouseEnter={() =>
                                                                setActiveIndex(
                                                                    index,
                                                                )
                                                            }
                                                            onClick={() =>
                                                                chooseYear(year)
                                                            }
                                                            className={`flex min-h-10 w-full items-center justify-between rounded-lg px-3 text-left text-sm font-medium transition-colors outline-none ${index === activeIndex ? 'bg-brand-surface-soft text-brand-primary-strong' : 'hover:bg-muted'}`}
                                                        >
                                                            SSC Batch {year}
                                                            {selectedYear ===
                                                                year && (
                                                                <Check
                                                                    className="size-4 text-brand-success"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </button>
                                                    ),
                                                )
                                            ) : (
                                                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                                                    No valid batch year found.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <InputError message={errors.batch_year} />
                            </div>

                            <div className="mt-5 flex items-start gap-3 rounded-xl border border-brand-primary/10 bg-brand-surface-soft/70 p-4">
                                <ShieldCheck
                                    className="mt-0.5 size-5 shrink-0 text-brand-primary-strong"
                                    aria-hidden="true"
                                />
                                <p className="text-xs leading-5 text-muted-foreground">
                                    Your batch information is required to
                                    generate your unique DMHMA Alumni Member ID.
                                    It cannot be changed after submission.
                                </p>
                            </div>

                            {selectedYear && (
                                <p className="mt-4 text-center text-xs font-semibold text-brand-primary-strong">
                                    Your ID will begin with DMHMA-{selectedYear}
                                    -
                                </p>
                            )}

                            <Button
                                type="submit"
                                size="lg"
                                disabled={selectedYear === null || processing}
                                className="mt-6 h-12 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-[0_10px_26px_rgba(14,165,233,0.24)] hover:bg-sky-400"
                            >
                                {processing ? (
                                    <>
                                        <LoaderCircle
                                            className="animate-spin"
                                            aria-hidden="true"
                                        />
                                        Generating your Member ID...
                                    </>
                                ) : (
                                    'Continue'
                                )}
                            </Button>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
