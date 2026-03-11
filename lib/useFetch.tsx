'use client';

import { useState, useEffect } from "react";
import { createClient } from "./supabase/client";

const useFetch = (table, options = {}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsPending(true);
      setError(null);
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      let query = supabase.from(table).select(options.select || "*").eq('user_id', userId);

      if (options.filter) query = query.eq(options.filter.col, options.filter.val);
      if (options.order)  query = query.order(options.order.col, { ascending: options.order.asc ?? true });
      if (options.limit)  query = query.limit(options.limit);

      const { data, error } = await query;

      if (!isCancelled) {
        if (error) {
          setError(error.message);
          setIsPending(false);
        } else {
          setData(data);
          setIsPending(false);
          setError(null);
        }
      }
    };

    fetchData();

    // replaces abortController — cancels state updates if component unmounts
    return () => { isCancelled = true; };

  }, [table, JSON.stringify(options)]);

  return { data, isPending, error };
};

export default useFetch;
