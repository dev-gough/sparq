'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, Users, Wrench, TrendingUp, Search, X } from 'lucide-react'

interface SubQuestion {
    id: number
    question: string
    answer: string | Array<string | string[]>
}

interface FAQSection {
    id: number
    questionBrand: string
    subQuestions: SubQuestion[]
}

interface FAQData {
    faqs: FAQSection[]
}

interface FAQCategory {
    title: string
    icon: React.ReactNode
    data: FAQData
    color: string
    bgColor: string
}

interface AggregatedFAQProps {
    id?: string
    homeownersData: FAQData
    installersData: FAQData
    investorsData: FAQData
}

const renderAnswer = (answer: string | Array<string | string[]>, index: number = 0): React.ReactNode => {
    if (typeof answer === 'string') {
        return <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">{answer}</p>
    }

    if (Array.isArray(answer)) {
        return (
            <div className="space-y-3">
                {answer.map((item, i) => {
                    if (typeof item === 'string') {
                        return (
                            <p key={`${index}-${i}`} className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                                {item}
                            </p>
                        )
                    } else if (Array.isArray(item)) {
                        return (
                            <ul key={`${index}-${i}`} className="list-disc list-inside space-y-2 ml-4">
                                {item.map((subItem: string, j: number) => (
                                    <li key={`${index}-${i}-${j}`} className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                                        {subItem}
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                    return null
                })}
            </div>
        )
    }

    return null
}

export default function AggregatedFAQ({ id, homeownersData, installersData, investorsData }: AggregatedFAQProps) {
    const [activeCategory, setActiveCategory] = useState<string>('homeowners')
    const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set())
    const [searchQuery, setSearchQuery] = useState<string>('')

    const categories: Record<string, FAQCategory> = useMemo(() => ({
        homeowners: {
            title: 'Homeowners',
            icon: <Users className="w-5 h-5" />,
            data: homeownersData,
            color: 'text-brand-maroon dark:text-brand-maroon',
            bgColor: 'bg-brand-maroon/10 border-brand-maroon/30 dark:bg-brand-maroon/20 dark:border-brand-maroon/40'
        },
        installers: {
            title: 'Installers',
            icon: <Wrench className="w-5 h-5" />,
            data: installersData,
            color: 'text-brand-yellow dark:text-brand-yellow',
            bgColor: 'bg-brand-yellow/10 border-brand-yellow/30 dark:bg-brand-yellow/20 dark:border-brand-yellow/40'
        },
        investors: {
            title: 'Investors',
            icon: <TrendingUp className="w-5 h-5" />,
            data: investorsData,
            color: 'text-brand-graytext dark:text-brand-gray',
            bgColor: 'bg-brand-gray/10 border-brand-gray/30 dark:bg-brand-gray/20 dark:border-brand-gray/40'
        }
    }), [homeownersData, installersData, investorsData])

    const toggleQuestion = (questionId: string) => {
        const newOpenQuestions = new Set(openQuestions)
        if (newOpenQuestions.has(questionId)) {
            newOpenQuestions.delete(questionId)
        } else {
            newOpenQuestions.add(questionId)
        }
        setOpenQuestions(newOpenQuestions)
    }

    // Search functionality
    const searchInAnswer = (answer: string | Array<string | string[]>, query: string): boolean => {
        if (typeof answer === 'string') {
            return answer.toLowerCase().includes(query.toLowerCase())
        }
        
        if (Array.isArray(answer)) {
            return answer.some(item => {
                if (typeof item === 'string') {
                    return item.toLowerCase().includes(query.toLowerCase())
                } else if (Array.isArray(item)) {
                    return item.some(subItem => subItem.toLowerCase().includes(query.toLowerCase()))
                }
                return false
            })
        }
        
        return false
    }

    const filteredData = useMemo(() => {
        const currentData = categories[activeCategory].data
        
        if (!searchQuery.trim()) {
            return currentData
        }
        
        const query = searchQuery.trim()
        const filteredFaqs = currentData.faqs.map(section => ({
            ...section,
            subQuestions: section.subQuestions.filter(question => 
                question.question.toLowerCase().includes(query.toLowerCase()) ||
                searchInAnswer(question.answer, query)
            )
        })).filter(section => section.subQuestions.length > 0)
        
        return { faqs: filteredFaqs }
    }, [activeCategory, searchQuery, categories])

    const currentCategory = categories[activeCategory]
    const totalResults = filteredData.faqs.reduce((acc, section) => acc + section.subQuestions.length, 0)

    return (
        <section id={id} className="relative container mx-auto px-6 py-20">
            <div
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                    Frequently Asked Questions
                </h2>
                <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                    Find answers to common questions across all our audiences - homeowners, installers, and investors.
                </p>
            </div>

            {/* Search Bar */}
            <div
                className="max-w-2xl mx-auto mb-8"
            >
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-brand-graytext dark:text-dark-text-secondary" />
                    </div>
                    <input
                        type="text"
                        placeholder={`Search ${currentCategory.title} FAQs...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all duration-200 text-brand-darkmaroon dark:text-dark-text-primary placeholder-brand-graytext dark:placeholder-dark-text-muted"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-graytext dark:text-dark-text-secondary hover:text-brand-maroon transition-colors duration-200"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <div
                        className="mt-2 text-center text-sm text-brand-graytext dark:text-dark-text-secondary"
                    >
                        {totalResults === 0 
                            ? `No results found for "${searchQuery}"`
                            : `${totalResults} result${totalResults === 1 ? '' : 's'} found for "${searchQuery}"`
                        }
                    </div>
                )}
            </div>

            {/* Category Tabs */}
            <div
                className="flex flex-wrap justify-center gap-4 mb-12"
            >
                {Object.entries(categories).map(([key, category]) => (
                    <button
                        key={key}
                        onClick={() => {
                            setActiveCategory(key)
                            setSearchQuery('') // Clear search when switching categories
                        }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer ${activeCategory === key
                                ? `${category.color} ${category.bgColor} shadow-md`
                                : 'text-brand-graytext dark:text-dark-text-secondary bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                            }`}
                    >
                        {category.icon}
                        {category.title}
                    </button>
                ))}
            </div>

            {/* FAQ Content */}
            <div
                    key={activeCategory}
                    className="max-w-4xl mx-auto"
                >
                    {filteredData.faqs.length === 0 ? (
                        <div
                            className="text-center py-16"
                        >
                            <div className="flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-6">
                                <Search className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">No FAQs Found</h3>
                            <p className="text-brand-graytext dark:text-dark-text-secondary max-w-md mx-auto mb-6">
                                {searchQuery 
                                    ? `No questions or answers match "${searchQuery}". Try a different search term.`
                                    : "No FAQs available in this category."
                                }
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-maroon text-white rounded-lg hover:bg-brand-darkmaroon transition-colors duration-200"
                                >
                                    <X className="w-4 h-4" />
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        filteredData.faqs.map((section) => (
                            <div key={section.id} className="mb-12">
                                <h3 className="text-2xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6 flex items-center gap-3">
                                    <div className={`w-2 h-8 ${currentCategory.bgColor.replace('bg-', 'bg-').replace('-50', '-500')} rounded-full`} />
                                    {section.questionBrand}
                                </h3>

                            <div className="space-y-4">
                                {section.subQuestions.map((question) => {
                                    const questionKey = `${activeCategory}-${section.id}-${question.id}`
                                    const isOpen = openQuestions.has(questionKey)

                                    return (
                                        <div
                                            key={question.id}
                                            className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                            <button
                                                onClick={() => toggleQuestion(questionKey)}
                                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                                            >
                                                <span className="font-medium text-brand-darkmaroon dark:text-brand-yellow pr-4">
                                                    {question.question}
                                                </span>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-brand-graytext dark:text-dark-text-secondary transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>

                                            {isOpen && (
                                                    <div
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-4 border-t border-gray-100 dark:border-gray-600">
                                                            <div className="pt-4">
                                                                {renderAnswer(question.answer, question.id)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )))}
                </div>
        </section>
    )
}