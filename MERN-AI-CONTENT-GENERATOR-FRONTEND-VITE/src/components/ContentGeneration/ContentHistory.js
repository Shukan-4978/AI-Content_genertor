import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { getUserProfileAPI } from "../../apis/user/usersAPI";
import StatusMessage from "../Alert/StatusMessage";
import { Link } from "react-router-dom";

const ContentGenerationHistory = () => {
  const [expandedItems, setExpandedItems] = useState({});

  // get user profile
  const { isLoading, isError, data, error } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <StatusMessage type="loading" message="Querying history logs..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4">
        <StatusMessage type="error" message={error?.response?.data?.message || "Failed to load history"} />
      </div>
    );
  }

  const history = data?.user?.contentHistory || [];

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto cyber-grid">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-wider">
            HISTORY <span className="bg-gradient-to-r from-cyber-secondary to-cyber-primary bg-clip-text text-transparent">LOGS</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">Archived nodes and neural prompt outputs</p>
        </div>
        <Link
          to="/generate-content"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber-primary to-cyber-accent px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
        >
          <FaPlusSquare className="w-4 h-4" /> Initialize Prompt
        </Link>
      </div>

      {/* Content history list */}
      <div className="glass-panel rounded-3xl overflow-hidden p-6">
        {history.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No query logs stored in archive.
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((content) => {
              const isExpanded = expandedItems[content?._id];
              const textContent = content?.content || "";
              const shouldTruncate = textContent.length > 150;
              const displayText = shouldTruncate && !isExpanded
                ? `${textContent.slice(0, 150)}...`
                : textContent;

              return (
                <div
                  key={content?._id}
                  onClick={() => shouldTruncate && toggleExpand(content?._id)}
                  className={`bg-white/5 border border-white/5 hover:border-cyber-primary/30 p-6 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    shouldTruncate ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="absolute top-0 right-0 bg-white/5 text-[9px] font-bold text-gray-400 tracking-wider px-3 py-1 rounded-bl-xl">
                    {new Date(content?.createdAt).toLocaleString()}
                  </div>
                  
                  <div className="flex items-center justify-between pr-20 mb-2">
                    <div className="text-xs font-semibold text-cyber-secondary uppercase tracking-widest">
                      CONTENT NODE
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap mb-2">
                    {displayText}
                  </p>

                  {shouldTruncate && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(content?._id);
                      }}
                      className="text-xs font-bold text-cyber-secondary hover:text-cyber-secondary/85 flex items-center gap-1 transition-colors mt-2"
                    >
                      {isExpanded ? (
                        <>
                          Collapse Stream <ChevronUpIcon className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Read Full Stream <ChevronDownIcon className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentGenerationHistory;
