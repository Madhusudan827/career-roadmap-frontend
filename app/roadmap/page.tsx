"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar, MobileHeader } from "@/components/sidebar";
import { careerRoles, roadmapData, stageNames, type RoadmapTopic } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function RoadmapPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    const storedCompleted = localStorage.getItem("completedTopics");

    if (storedRole) {
      setSelectedRole(storedRole);
    }
    if (storedCompleted) {
      setCompletedTopics(JSON.parse(storedCompleted));
    }
    setIsLoaded(true);
  }, []);

  const toggleTopic = (topicId: string) => {
    setCompletedTopics((prev) => {
      const newCompleted = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];
      localStorage.setItem("completedTopics", JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const role = careerRoles.find((r) => r.id === selectedRole);
  const topics = selectedRole ? roadmapData[selectedRole] || [] : [];
  const totalTopics = topics.length;
  const completedCount = completedTopics.filter((id) =>
    topics.some((t) => t.id === id)
  ).length;
  const progress = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Group topics by stage
  const topicsByStage = topics.reduce((acc, topic) => {
    if (!acc[topic.stage]) acc[topic.stage] = [];
    acc[topic.stage].push(topic);
    return acc;
  }, {} as Record<number, RoadmapTopic[]>);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <svg className="h-8 w-8 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!selectedRole) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground">No Career Path Selected</h1>
        <p className="mt-2 text-muted-foreground">
          Choose a career path to view your roadmap
        </p>
        <Link
          href="/register"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Select a Path
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar selectedRole={selectedRole} progress={progress} />
      <MobileHeader selectedRole={selectedRole} progress={progress} />

      <main className="pt-28 lg:pl-64 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
                  {role?.title} Roadmap
                </h1>
                <p className="mt-1 text-muted-foreground">
                  Track your progress through each learning stage
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mb-8 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">Overall Progress</h2>
                <p className="text-sm text-muted-foreground">
                  {completedCount} of {totalTopics} topics completed
                </p>
              </div>
              <div className="text-3xl font-bold text-primary">{progress}%</div>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Roadmap Timeline */}
          <div className="space-y-8">
            {Object.entries(topicsByStage).map(([stage, stageTopics], stageIndex) => {
              const stageCompleted = stageTopics.filter((t) =>
                completedTopics.includes(t.id)
              ).length;
              const stageProgress = Math.round(
                (stageCompleted / stageTopics.length) * 100
              );
              const isStageComplete = stageCompleted === stageTopics.length;

              return (
                <div key={stage} className="relative">
                  {/* Timeline connector */}
                  {stageIndex < Object.keys(topicsByStage).length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border lg:left-8" />
                  )}

                  {/* Stage Header */}
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold lg:h-16 lg:w-16 lg:text-xl transition-colors",
                        isStageComplete
                          ? "bg-success text-success-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {isStageComplete ? (
                        <svg className="h-6 w-6 lg:h-8 lg:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        stage
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground lg:text-xl">
                        {stageNames[Number(stage)]}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              isStageComplete ? "bg-success" : "bg-primary"
                            )}
                            style={{ width: `${stageProgress}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {stageCompleted}/{stageTopics.length} completed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div className="ml-6 grid gap-3 sm:grid-cols-2 lg:ml-8 lg:grid-cols-3">
                    {stageTopics.map((topic) => {
                      const isCompleted = completedTopics.includes(topic.id);

                      return (
                        <button
                          key={topic.id}
                          onClick={() => toggleTopic(topic.id)}
                          className={cn(
                            "group relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                            isCompleted
                              ? "border-success/30 bg-success/5 hover:border-success/50"
                              : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                          )}
                        >
                          {/* Checkbox */}
                          <div
                            className={cn(
                              "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all",
                              isCompleted
                                ? "border-success bg-success"
                                : "border-muted-foreground/30 group-hover:border-primary"
                            )}
                          >
                            {isCompleted && (
                              <svg className="h-3 w-3 text-success-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4
                              className={cn(
                                "font-medium transition-colors",
                                isCompleted
                                  ? "text-success"
                                  : "text-card-foreground group-hover:text-primary"
                              )}
                            >
                              {topic.title}
                            </h4>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                              {topic.description}
                            </p>
                          </div>

                          {/* Status Badge */}
                          <div
                            className={cn(
                              "absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium",
                              isCompleted
                                ? "bg-success/20 text-success"
                                : "bg-secondary text-muted-foreground"
                            )}
                          >
                            {isCompleted ? "Done" : "Pending"}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Message */}
          {progress === 100 && (
            <div className="mt-8 rounded-xl border border-success/30 bg-success/5 p-6 text-center">
              <div className="mb-3 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
                  <svg className="h-8 w-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-success">Congratulations!</h3>
              <p className="mt-2 text-muted-foreground">
                {"You've completed the entire"} {role?.title} roadmap. {"You're ready to take on new challenges!"}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
