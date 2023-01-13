// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * A Filter is a class that contains data for a filter that can be translated
 * into a proto when needed.
 *
 * @see {@link https://cloud.google.com/datastore/docs/concepts/queries#filters| Filters Reference}
 *
 */
abstract class Filter {
  /**
   * Gets the proto for the filter.
   *
   */
  // eslint-disable-next-line
  abstract toProto(): any;
}

/**
 * A PropertyFilter is a filter that gets applied to a query directly.
 *
 * @see {@link https://cloud.google.com/datastore/docs/concepts/queries#property_filters| Property filters Reference}
 *
 * @class
 */
class PropertyFilter {

}

/**
 * A CompositeFilter is a filter that combines other filters and applies that
 * combination to a query.
 *
 * @see {@link https://cloud.google.com/datastore/docs/concepts/queries#composite_filters| Composite filters Reference}
 *
 * @class
 */
class CompositeFilter {

}
